const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');
const path = require('path');
const fs = require('fs');

// Helper to safely parse JSON from form-data
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

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;

  let sql = 'SELECT * FROM Product';
  const conditions = [];
  const params = [];

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (featured === 'true') {
    conditions.push('isFeatured = ?');
    params.push(true);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  const pool = getPool();
  const [products] = await pool.execute(sql, params);
  res.json({ success: true, data: products });
});

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM Product WHERE slug = ? LIMIT 1', [req.params.slug]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: rows[0] });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { slug, name, shortDescription, description, category, isFeatured, specifications, features, applications } = req.body;

  if (!slug || !name || !shortDescription || !description || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  const imagePath = `/uploads/products/${req.file.filename}`;

  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO Product
      (slug, name, shortDescription, description, image, category, isFeatured, specifications, features, applications, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      slug,
      name,
      shortDescription,
      description,
      imagePath,
      category,
      isFeatured === 'true' || isFeatured === true ? 1 : 0,
      JSON.stringify(safeParse(specifications) || {}),
      JSON.stringify(safeParse(features) || []),
      JSON.stringify(safeParse(applications) || []),
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Product WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, data: rows[0] });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, name, shortDescription, description, category, isFeatured, specifications, features, applications } = req.body;

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Product WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Product not found');
  }
  const existing = existingRows[0];

  const updatedSlug = slug || existing.slug;
  const updatedName = name || existing.name;
  const updatedShortDesc = shortDescription || existing.shortDescription;
  const updatedDesc = description || existing.description;
  const updatedCategory = category || existing.category;
  const updatedFeatured = isFeatured !== undefined
    ? (isFeatured === 'true' || isFeatured === true ? 1 : 0)
    : existing.isFeatured;
  const updatedSpecs = specifications ? JSON.stringify(safeParse(specifications)) : (typeof existing.specifications === 'string' ? existing.specifications : JSON.stringify(existing.specifications));
  const updatedFeatures = features ? JSON.stringify(safeParse(features)) : (typeof existing.features === 'string' ? existing.features : JSON.stringify(existing.features));
  const updatedApps = applications ? JSON.stringify(safeParse(applications)) : (typeof existing.applications === 'string' ? existing.applications : JSON.stringify(existing.applications));

  let updatedImage = existing.image;

  // If new image is uploaded, update path and optionally delete old image
  if (req.file) {
    updatedImage = `/uploads/products/${req.file.filename}`;

    // Optional: Delete old image from disk
    const oldImagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  await pool.execute(
    `UPDATE Product SET
      slug = ?, name = ?, shortDescription = ?, description = ?, image = ?,
      category = ?, isFeatured = ?, specifications = ?, features = ?, applications = ?,
      updatedAt = NOW()
    WHERE id = ?`,
    [
      updatedSlug, updatedName, updatedShortDesc, updatedDesc, updatedImage,
      updatedCategory, updatedFeatured, updatedSpecs, updatedFeatures, updatedApps,
      id
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM Product WHERE id = ?', [id]);
  res.json({ success: true, data: rows[0] });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM Product WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Product not found');
  }
  const existing = existingRows[0];

  // Delete image from disk
  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await pool.execute('DELETE FROM Product WHERE id = ?', [id]);

  res.json({ success: true, message: 'Product deleted successfully' });
});

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
