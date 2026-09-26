const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Get all reasons
// @route   GET /api/why-choose-us
// @access  Public
const getReasons = asyncHandler(async (req, res) => {
  const reasons = await prisma.whyChooseUs.findMany({
    orderBy: { order: 'asc' },
  });
  res.json({ success: true, data: reasons });
});

// @desc    Create a reason
// @route   POST /api/why-choose-us
// @access  Private/Admin
const createReason = asyncHandler(async (req, res) => {
  const { title, description, icon, order } = req.body;

  if (!title || !description || !icon) {
    res.status(400);
    throw new Error('Title, description and icon are required');
  }

  const reason = await prisma.whyChooseUs.create({
    data: {
      title,
      description,
      icon,
      order: order ? parseInt(order) : 0,
    },
  });

  res.status(201).json({ success: true, data: reason });
});

// @desc    Update a reason
// @route   PUT /api/why-choose-us/:id
// @access  Private/Admin
const updateReason = asyncHandler(async (req, res) => {
  const { title, description, icon, order } = req.body;
  const id = parseInt(req.params.id);

  const existing = await prisma.whyChooseUs.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Reason not found');
  }

  const reason = await prisma.whyChooseUs.update({
    where: { id },
    data: {
      title: title || existing.title,
      description: description || existing.description,
      icon: icon || existing.icon,
      order: order !== undefined ? parseInt(order) : existing.order,
    },
  });

  res.json({ success: true, data: reason });
});

// @desc    Delete a reason
// @route   DELETE /api/why-choose-us/:id
// @access  Private/Admin
const deleteReason = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const existing = await prisma.whyChooseUs.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Reason not found');
  }

  await prisma.whyChooseUs.delete({ where: { id } });

  res.json({ success: true, message: 'Reason deleted successfully' });
});

module.exports = {
  getReasons,
  createReason,
  updateReason,
  deleteReason,
};
