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

// @desc    Get all industries
// @route   GET /api/industries
// @access  Public
const getIndustries = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [items] = await pool.execute('SELECT * FROM Industry');
  res.json({ success: true, data: items });
});

// @desc    Get industry by slug
// @route   GET /api/industries/:slug
// @access  Public
const getIndustryBySlug = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM Industry WHERE slug = ? LIMIT 1', [req.params.slug]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error('Industry not found');
  }

  res.json({ success: true, data: rows[0] });
});

// @desc    Create an industry
// @route   POST /api/industries
// @access  Private/Admin
const createIndustry = asyncHandler(async (req, res) => {
  const { slug, name, description, icon, products } = req.body;

  if (!slug || !name || !description || !icon) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  let imagePath = null;
  if (req.file) {
    imagePath = `/uploads/industries/${req.file.filename}`;
  }

  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO Industry
      (slug, name, description, icon, image, products, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      slug,
      name,
      description,
      icon,
      imagePath,
      JSON.stringify(safeParse(products) || []),
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Industry WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, data: rows[0] });
});

// @desc    Update an industry
// @route   PUT /api/industries/:id
// @access  Private/Admin
const updateIndustry = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, name, description, icon, products } = req.body;

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Industry WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Industry not found');
  }
  const existing = existingRows[0];

  const updatedSlug = slug || existing.slug;
  const updatedName = name || existing.name;
  const updatedDesc = description || existing.description;
  const updatedIcon = icon || existing.icon;
  const updatedProducts = products ? JSON.stringify(safeParse(products)) : (typeof existing.products === 'string' ? existing.products : JSON.stringify(existing.products));

  let updatedImage = existing.image;
  if (req.file) {
    updatedImage = `/uploads/industries/${req.file.filename}`;
    if (existing.image) {
      const oldImagePath = path.join(__dirname, '..', existing.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }
  }

  await pool.execute(
    `UPDATE Industry SET
      slug = ?, name = ?, description = ?, icon = ?, image = ?, products = ?,
      updatedAt = NOW()
    WHERE id = ?`,
    [updatedSlug, updatedName, updatedDesc, updatedIcon, updatedImage, updatedProducts, id]
  );

  const [rows] = await pool.execute('SELECT * FROM Industry WHERE id = ?', [id]);
  res.json({ success: true, data: rows[0] });
});

// @desc    Delete an industry
// @route   DELETE /api/industries/:id
// @access  Private/Admin
const deleteIndustry = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Industry WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Industry not found');
  }
  const existing = existingRows[0];

  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await pool.execute('DELETE FROM Industry WHERE id = ?', [id]);

  res.json({ success: true, message: 'Industry deleted successfully' });
});

module.exports = {
  getIndustries,
  getIndustryBySlug,
  createIndustry,
  updateIndustry,
  deleteIndustry,
};
