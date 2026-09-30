const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { getPool } = require('../config/db');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Debug: log the token being received (first 20 chars only for security)
      console.log('[Auth] Token received:', token ? token.substring(0, 20) + '...' : 'EMPTY');

      if (!token || token === 'null' || token === 'undefined') {
        res.status(401);
        throw new Error('Not authorized, token is empty or null');
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      console.log('[Auth] Token verified, admin id:', decoded.id);

      // Get user from the token
      const pool = getPool();
      const [rows] = await pool.execute(
        'SELECT id, email, name, createdAt, updatedAt FROM AdminUser WHERE id = ? LIMIT 1',
        [decoded.id]
      );

      req.admin = rows[0] || null;

      if (!req.admin) {
        res.status(401);
        throw new Error('Not authorized, admin not found');
      }

      return next();
    } catch (error) {
      console.error('[Auth] Token verification failed:', error.message);
      res.status(401);
      throw new Error('Not authorized, token failed: ' + error.message);
    }
  }

  if (!token) {
    console.error('[Auth] No Authorization header found');
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

module.exports = { protect };
