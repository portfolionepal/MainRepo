const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
};



// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for admin email
  const pool = getPool();
  const [rows] = await pool.execute(
    'SELECT * FROM AdminUser WHERE email = ? LIMIT 1',
    [email]
  );
  const admin = rows[0] || null;

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get admin data
// @route   GET /api/admin/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.admin,
  });
});

module.exports = {
  loginAdmin,
  getMe,
};