const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

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
  const items = await prisma.industry.findMany();
  res.json({ success: true, data: items });
});

// @desc    Get industry by slug
// @route   GET /api/industries/:slug
// @access  Public
const getIndustryBySlug = asyncHandler(async (req, res) => {
  const item = await prisma.industry.findUnique({
    where: { slug: req.params.slug },
  });

  if (!item) {
    res.status(404);
    throw new Error('Industry not found');
  }

  res.json({ success: true, data: item });
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

  const item = await prisma.industry.create({
    data: {
      slug,
      name,
      description,
      icon,
      image: imagePath,
      products: safeParse(products) || [],
    },
  });

  res.status(201).json({ success: true, data: item });
});

// @desc    Update an industry
// @route   PUT /api/industries/:id
// @access  Private/Admin
const updateIndustry = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, name, description, icon, products } = req.body;

  const existing = await prisma.industry.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Industry not found');
  }

  const dataToUpdate = {
    slug: slug || existing.slug,
    name: name || existing.name,
    description: description || existing.description,
    icon: icon || existing.icon,
  };

  if (products) dataToUpdate.products = safeParse(products);

  if (req.file) {
    dataToUpdate.image = `/uploads/industries/${req.file.filename}`;
    if (existing.image) {
      const oldImagePath = path.join(__dirname, '..', existing.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }
  }

  const item = await prisma.industry.update({
    where: { id },
    data: dataToUpdate,
  });

  res.json({ success: true, data: item });
});

// @desc    Delete an industry
// @route   DELETE /api/industries/:id
// @access  Private/Admin
const deleteIndustry = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const existing = await prisma.industry.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Industry not found');
  }

  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await prisma.industry.delete({ where: { id } });

  res.json({ success: true, message: 'Industry deleted successfully' });
});

module.exports = {
  getIndustries,
  getIndustryBySlug,
  createIndustry,
  updateIndustry,
  deleteIndustry,
};
