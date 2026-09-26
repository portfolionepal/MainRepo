const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // we installed bcrypt, but typically require bcryptjs if it's there. User asked for bcrypt. Let's try require('bcrypt') since we installed bcrypt.
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// Use bcrypt instead of bcryptjs as installed
const bcryptLib = require('bcrypt');

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
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (admin && (await bcryptLib.compare(password, admin.password))) {
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
