const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');

// @desc    Get all reasons
// @route   GET /api/why-choose-us
// @access  Public
const getReasons = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [reasons] = await pool.execute('SELECT * FROM WhyChooseUs ORDER BY `order` ASC');
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

  const pool = getPool();
  const [result] = await pool.execute(
    'INSERT INTO WhyChooseUs (title, description, icon, `order`, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
    [title, description, icon, order ? parseInt(order) : 0]
  );

  const [rows] = await pool.execute('SELECT * FROM WhyChooseUs WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, data: rows[0] });
});

// @desc    Update a reason
// @route   PUT /api/why-choose-us/:id
// @access  Private/Admin
const updateReason = asyncHandler(async (req, res) => {
  const { title, description, icon, order } = req.body;
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM WhyChooseUs WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Reason not found');
  }
  const existing = existingRows[0];

  await pool.execute(
    'UPDATE WhyChooseUs SET title = ?, description = ?, icon = ?, `order` = ?, updatedAt = NOW() WHERE id = ?',
    [
      title || existing.title,
      description || existing.description,
      icon || existing.icon,
      order !== undefined ? parseInt(order) : existing.order,
      id
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM WhyChooseUs WHERE id = ?', [id]);
  res.json({ success: true, data: rows[0] });
});

// @desc    Delete a reason
// @route   DELETE /api/why-choose-us/:id
// @access  Private/Admin
const deleteReason = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const pool = getPool();
  const [existingRows] = await pool.execute('SELECT * FROM WhyChooseUs WHERE id = ?', [id]);
  if (existingRows.length === 0) {
    res.status(404);
    throw new Error('Reason not found');
  }

  await pool.execute('DELETE FROM WhyChooseUs WHERE id = ?', [id]);

  res.json({ success: true, message: 'Reason deleted successfully' });
});

module.exports = {
  getReasons,
  createReason,
  updateReason,
  deleteReason,
};
