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

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolio = asyncHandler(async (req, res) => {
  const items = await prisma.portfolio.findMany();
  res.json({ success: true, data: items });
});

// @desc    Get portfolio item by slug
// @route   GET /api/portfolio/:slug
// @access  Public
const getPortfolioBySlug = asyncHandler(async (req, res) => {
  const item = await prisma.portfolio.findUnique({
    where: { slug: req.params.slug },
  });

  if (!item) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }

  res.json({ success: true, data: item });
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

  const item = await prisma.portfolio.create({
    data: {
      slug,
      title,
      client,
      category,
      description,
      fullDescription,
      year,
      image: imagePath,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      tags: safeParse(tags) || [],
    },
  });

  res.status(201).json({ success: true, data: item });
});

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
const updatePortfolio = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, title, client, category, description, fullDescription, year, isFeatured, tags } = req.body;

  const existing = await prisma.portfolio.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }

  const dataToUpdate = {
    slug: slug || existing.slug,
    title: title || existing.title,
    client: client || existing.client,
    category: category || existing.category,
    description: description || existing.description,
    fullDescription: fullDescription || existing.fullDescription,
    year: year || existing.year,
    isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : existing.isFeatured,
  };

  if (tags) dataToUpdate.tags = safeParse(tags);

  if (req.file) {
    dataToUpdate.image = `/uploads/portfolio/${req.file.filename}`;
    const oldImagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

  const item = await prisma.portfolio.update({
    where: { id },
    data: dataToUpdate,
  });

  res.json({ success: true, data: item });
});

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
const deletePortfolio = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const existing = await prisma.portfolio.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Portfolio item not found');
  }

  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await prisma.portfolio.delete({ where: { id } });

  res.json({ success: true, message: 'Portfolio item deleted successfully' });
});

module.exports = {
  getPortfolio,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
