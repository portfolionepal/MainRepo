
const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');
const { getPool } = require('./config/db');

const app = express();

// Handle cPanel application URL prefix if it is not stripped automatically
app.use((req, res, next) => {
  if (req.url === '/apiv3' || req.url.startsWith('/apiv3/')) {
    req.url = req.url.slice('/apiv3'.length) || '/';
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Uploads
const uploadBase = process.env.UPLOAD_PATH
  ? path.resolve(process.env.UPLOAD_PATH)
  : path.join(__dirname, 'uploads');

app.use('/uploads', express.static(uploadBase));

// Temporary database health check
app.get('/api/db-health', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    res.json({ database: 'connected' });
  } catch (error) {
    console.error('Database health check failed:', error.message);
    res.status(500).json({ database: 'disconnected' });
  }
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/products', require('./routes/products'));
app.use('/api/services', require('./routes/services'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/why-choose-us', require('./routes/whyChooseUs'));
app.use('/api/industries', require('./routes/industries'));
app.use('/api/contact', require('./routes/contact'));

// Error handler
app.use(errorHandler);

module.exports = app;