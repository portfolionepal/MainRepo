const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Get all stats
// @route   GET /api/stats
// @access  Public
const getStats = asyncHandler(async (req, res) => {
  const stats = await prisma.companyStat.findMany({
    orderBy: { order: 'asc' },
  });
  res.json({ success: true, data: stats });
});

// @desc    Create a stat
// @route   POST /api/stats
// @access  Private/Admin
const createStat = asyncHandler(async (req, res) => {
  const { value, label, order } = req.body;

  if (!value || !label) {
    res.status(400);
    throw new Error('Value and label are required');
  }

  const stat = await prisma.companyStat.create({
    data: {
      value,
      label,
      order: order ? parseInt(order) : 0,
    },
  });

  res.status(201).json({ success: true, data: stat });
});

// @desc    Update a stat
// @route   PUT /api/stats/:id
// @access  Private/Admin
const updateStat = asyncHandler(async (req, res) => {
  const { value, label, order } = req.body;
  const id = parseInt(req.params.id);

  const existing = await prisma.companyStat.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Stat not found');
  }

  const stat = await prisma.companyStat.update({
    where: { id },
    data: {
      value: value || existing.value,
      label: label || existing.label,
      order: order !== undefined ? parseInt(order) : existing.order,
    },
  });

  res.json({ success: true, data: stat });
});

// @desc    Delete a stat
// @route   DELETE /api/stats/:id
// @access  Private/Admin
const deleteStat = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const existing = await prisma.companyStat.findUnique({ where: { id } });
  if (!existing) {
    res.status(404);
    throw new Error('Stat not found');
  }

  await prisma.companyStat.delete({ where: { id } });

  res.json({ success: true, message: 'Stat deleted successfully' });
});

module.exports = {
  getStats,
  createStat,
  updateStat,
  deleteStat,
};
