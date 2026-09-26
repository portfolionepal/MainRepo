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

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany();
  res.json({ success: true, data: services });
});

// @desc    Get service by slug
// @route   GET /api/services/:slug
// @access  Public
const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { slug: req.params.slug },
  });

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.json({ success: true, data: service });
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const { slug, name, shortDescription, description, icon, isFeatured, process, benefits } = req.body;

  if (!slug || !name || !shortDescription || !description || !icon) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  const imagePath = `/uploads/services/${req.file.filename}`;

  const service = await prisma.service.create({
    data: {
      slug,
      name,
      shortDescription,
      description,
      icon,
      image: imagePath,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      process: safeParse(process) || [],
      benefits: safeParse(benefits) || [],
    },
  });

  res.status(201).json({ success: true, data: service });
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { slug, name, shortDescription, description, icon, isFeatured, process, benefits } = req.body;

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Service not found');
  }

  const dataToUpdate = {
    slug: slug || existing.slug,
    name: name || existing.name,
    shortDescription: shortDescription || existing.shortDescription,
    description: description || existing.description,
    icon: icon || existing.icon,
    isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : existing.isFeatured,
  };

  if (process) dataToUpdate.process = safeParse(process);
  if (benefits) dataToUpdate.benefits = safeParse(benefits);

  if (req.file) {
    dataToUpdate.image = `/uploads/services/${req.file.filename}`;
    const oldImagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

  const service = await prisma.service.update({
    where: { id },
    data: dataToUpdate,
  });

  res.json({ success: true, data: service });
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Service not found');
  }

  if (existing.image) {
    const imagePath = path.join(__dirname, '..', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await prisma.service.delete({ where: { id } });

  res.json({ success: true, message: 'Service deleted successfully' });
});

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
