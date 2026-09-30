const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');

// @desc    Get contact info (single record)
// @route   GET /api/contact
// @access  Public
const getContactInfo = asyncHandler(async (req, res) => {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM ContactInfo LIMIT 1');
  const contact = rows[0] || null;
  res.json({ success: true, data: contact });
});

// @desc    Update/Upsert contact info
// @route   PUT /api/contact
// @access  Private/Admin
const updateContactInfo = asyncHandler(async (req, res) => {
  const {
    name, address, phone, mobile, email, mapUrl,
    facebookUrl, whatsappUrl, instagramUrl, workingHours
  } = req.body;

  if (!name || !address || !phone || !email) {
    res.status(400);
    throw new Error('Name, address, phone and email are required');
  }

  const pool = getPool();

  // Find existing record
  const [existing] = await pool.execute('SELECT * FROM ContactInfo LIMIT 1');
  let contact;

  if (existing.length > 0) {
    // Update existing record
    await pool.execute(
      `UPDATE ContactInfo SET
        name = ?, address = ?, phone = ?, mobile = ?, email = ?, mapUrl = ?,
        facebookUrl = ?, whatsappUrl = ?, instagramUrl = ?, workingHours = ?,
        updatedAt = NOW()
      WHERE id = ?`,
      [name, address, phone, mobile, email, mapUrl,
        facebookUrl || null, whatsappUrl || null, instagramUrl || null, workingHours,
        existing[0].id]
    );
    const [updated] = await pool.execute('SELECT * FROM ContactInfo WHERE id = ?', [existing[0].id]);
    contact = updated[0];
  } else {
    // Create new record
    const [result] = await pool.execute(
      `INSERT INTO ContactInfo
        (name, address, phone, mobile, email, mapUrl, facebookUrl, whatsappUrl, instagramUrl, workingHours, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, address, phone, mobile, email, mapUrl,
        facebookUrl || null, whatsappUrl || null, instagramUrl || null, workingHours]
    );
    const [inserted] = await pool.execute('SELECT * FROM ContactInfo WHERE id = ?', [result.insertId]);
    contact = inserted[0];
  }

  res.json({ success: true, data: contact });
});

module.exports = {
  getContactInfo,
  updateContactInfo,
};
