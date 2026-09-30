const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');
const path = require('path');
const fs = require('fs');

const safeParse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
};

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolio = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [items] = await pool.execute('SELECT * FROM Portfolio');
  res.json({ success: true, data: items });
});

// @desc    Get portfolio item by slug
// @route   GET /api/portfolio/:slug
// @access  Public
const getPortfolioBySlug = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM Portfolio WHERE slug = ? LIMIT 1', [req.params.slug]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }

  res.json({ success: true, data: rows[0] });
});

// @desc    Create a portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
const createPortfolio = asyncHandler(async (req, res) => {
  const { slug, title, client, category, description, fullDescription, year, isFeatured, tags } = req.body;

  if (!slug || !title || !client || !category || !description || !fullDescription || !year) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  const imagePath = `/uploads/portfolio/${req.file.filename}`;

  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO Portfolio
      (slug, title, client, category, description, fullDescription, image, tags, year, isFeatured, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      slug,
      title,
      client,
      category,
      description,
      fullDescription,
      imagePath,
      JSON.stringify(safeParse(tags) || []),
      year,
      isFeatured === 'true' || isFeatured === true ? 1 : 0,
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Portfolio WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, data: rows[0] });
});

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
const updatePortfolio = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, title, client, category, description, fullDescription, year, isFeatured, tags } = req.body;

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Portfolio WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }
  const existing = existingRows[0];

  const updatedSlug = slug || existing.slug;
  const updatedTitle = title || existing.title;
  const updatedClient = client || existing.client;
  const updatedCategory = category || existing.category;
  const updatedDesc = description || existing.description;
  const updatedFullDesc = fullDescription || existing.fullDescription;
  const updatedYear = year || existing.year;
  const updatedFeatured = isFeatured !== undefined
    ? (isFeatured === 'true' || isFeatured === true ? 1 : 0)
    : existing.isFeatured;
  const updatedTags = tags ? JSON.stringify(safeParse(tags)) : (typeof existing.tags === 'string' ? existing.tags : JSON.stringify(existing.tags));

  let updatedImage = existing.image;
  if (req.file) {
    updatedImage = `/uploads/portfolio/${req.file.filename}`;
    const oldImagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

  await pool.execute(
    `UPDATE Portfolio SET
      slug = ?, title = ?, client = ?, category = ?, description = ?,
      fullDescription = ?, image = ?, tags = ?, year = ?, isFeatured = ?,
      updatedAt = NOW()
    WHERE id = ?`,
    [
      updatedSlug, updatedTitle, updatedClient, updatedCategory, updatedDesc,
      updatedFullDesc, updatedImage, updatedTags, updatedYear, updatedFeatured,
      id
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Portfolio WHERE id = ?', [id]);
  res.json({ success: true, data: rows[0] });
});

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
const deletePortfolio = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Portfolio WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }
  const existing = existingRows[0];

  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await pool.execute('DELETE FROM Portfolio WHERE id = ?', [id]);

  res.json({ success: true, message: 'Portfolio item deleted successfully' });
});

module.exports = {
  getPortfolio,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
