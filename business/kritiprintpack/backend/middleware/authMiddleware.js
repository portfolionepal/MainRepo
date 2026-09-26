const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

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
      req.admin = await prisma.adminUser.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, createdAt: true, updatedAt: true }
      });

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

