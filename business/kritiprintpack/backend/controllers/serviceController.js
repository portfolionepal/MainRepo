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

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [services] = await pool.execute('SELECT * FROM Service');
  res.json({ success: true, data: services });
});

// @desc    Get service by slug
// @route   GET /api/services/:slug
// @access  Public
const getServiceBySlug = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM Service WHERE slug = ? LIMIT 1', [req.params.slug]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.json({ success: true, data: rows[0] });
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const { slug, name, shortDescription, description, icon, isFeatured, process: processData, benefits } = req.body;

  if (!slug || !name || !shortDescription || !description || !icon) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  const imagePath = `/uploads/services/${req.file.filename}`;

  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO Service
      (slug, name, shortDescription, description, image, icon, isFeatured, process, benefits, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      slug,
      name,
      shortDescription,
      description,
      imagePath,
      icon,
      isFeatured === 'true' || isFeatured === true ? 1 : 0,
      JSON.stringify(safeParse(processData) || []),
      JSON.stringify(safeParse(benefits) || []),
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Service WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, data: rows[0] });
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, name, shortDescription, description, icon, isFeatured, process: processData, benefits } = req.body;

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Service WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Service not found');
  }
  const existing = existingRows[0];

  const updatedSlug = slug || existing.slug;
  const updatedName = name || existing.name;
  const updatedShortDesc = shortDescription || existing.shortDescription;
  const updatedDesc = description || existing.description;
  const updatedIcon = icon || existing.icon;
  const updatedFeatured = isFeatured !== undefined
    ? (isFeatured === 'true' || isFeatured === true ? 1 : 0)
    : existing.isFeatured;
  const updatedProcess = processData ? JSON.stringify(safeParse(processData)) : (typeof existing.process === 'string' ? existing.process : JSON.stringify(existing.process));
  const updatedBenefits = benefits ? JSON.stringify(safeParse(benefits)) : (typeof existing.benefits === 'string' ? existing.benefits : JSON.stringify(existing.benefits));

  let updatedImage = existing.image;
  if (req.file) {
    updatedImage = `/uploads/services/${req.file.filename}`;
    const oldImagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

  await pool.execute(
    `UPDATE Service SET
      slug = ?, name = ?, shortDescription = ?, description = ?, image = ?,
      icon = ?, isFeatured = ?, process = ?, benefits = ?,
      updatedAt = NOW()
    WHERE id = ?`,
    [
      updatedSlug, updatedName, updatedShortDesc, updatedDesc, updatedImage,
      updatedIcon, updatedFeatured, updatedProcess, updatedBenefits,
      id
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Service WHERE id = ?', [id]);
  res.json({ success: true, data: rows[0] });
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Service WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Service not found');
  }
  const existing = existingRows[0];

  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await pool.execute('DELETE FROM Service WHERE id = ?', [id]);

  res.json({ success: true, message: 'Service deleted successfully' });
});

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
