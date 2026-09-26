const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

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
  const where = {};
  
  if (category) {
    where.category = category;
  }
  if (featured === 'true') {
    where.isFeatured = true;
  }

  const products = await prisma.product.findMany({ where });
  res.json({ success: true, data: products });
});

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
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

  const product = await prisma.product.create({
    data: {
      slug,
      name,
      shortDescription,
      description,
      category,
      image: imagePath,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      specifications: safeParse(specifications) || {},
      features: safeParse(features) || [],
      applications: safeParse(applications) || [],
    },
  });

  res.status(201).json({ success: true, data: product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, name, shortDescription, description, category, isFeatured, specifications, features, applications } = req.body;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Product not found');
  }

  const dataToUpdate = {
    slug: slug || existing.slug,
    name: name || existing.name,
    shortDescription: shortDescription || existing.shortDescription,
    description: description || existing.description,
    category: category || existing.category,
    isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : existing.isFeatured,
  };

  if (specifications) dataToUpdate.specifications = safeParse(specifications);
  if (features) dataToUpdate.features = safeParse(features);
  if (applications) dataToUpdate.applications = safeParse(applications);

  // If new image is uploaded, update path and optionally delete old image
  if (req.file) {
    dataToUpdate.image = `/uploads/products/${req.file.filename}`;
    
    // Optional: Delete old image from disk
    const oldImagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: dataToUpdate,
  });

  res.json({ success: true, data: product });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete image from disk
  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await prisma.product.delete({ where: { id } });

  res.json({ success: true, message: 'Product deleted successfully' });
});

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
