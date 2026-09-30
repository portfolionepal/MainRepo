const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');

// @desc    Get all stats
// @route   GET /api/stats
// @access  Public
const getStats = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [stats] = await pool.execute('SELECT * FROM CompanyStat ORDER BY `order` ASC');
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

  const pool = getPool();
  const [result] = await pool.execute(
    'INSERT INTO CompanyStat (value, label, `order`, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
    [value, label, order ? parseInt(order) : 0]
  );

  const [rows] = await pool.execute('SELECT * FROM CompanyStat WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, data: rows[0] });
});

// @desc    Update a stat
// @route   PUT /api/stats/:id
// @access  Private/Admin
const updateStat = asyncHandler(async (req, res) => {
  const { value, label, order } = req.body;
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM CompanyStat WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Stat not found');
  }
  const existing = existingRows[0];

  await pool.execute(
    'UPDATE CompanyStat SET value = ?, label = ?, `order` = ?, updatedAt = NOW() WHERE id = ?',
    [
      value || existing.value,
      label || existing.label,
      order !== undefined ? parseInt(order) : existing.order,
      id
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM CompanyStat WHERE id = ?', [id]);
  res.json({ success: true, data: rows[0] });
});

// @desc    Delete a stat
// @route   DELETE /api/stats/:id
// @access  Private/Admin
const deleteStat = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM CompanyStat WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Stat not found');
  }

  await pool.execute('DELETE FROM CompanyStat WHERE id = ?', [id]);

  res.json({ success: true, message: 'Stat deleted successfully' });
});

module.exports = {
  getStats,
  createStat,
  updateStat,
  deleteStat,
};
