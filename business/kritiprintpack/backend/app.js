const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for uploads
// Uses UPLOAD_PATH env var if set (e.g. on cPanel pointing to public_html/uploads),
// otherwise falls back to local ./uploads folder for local dev
const uploadBase = process.env.UPLOAD_PATH
  ? path.resolve(process.env.UPLOAD_PATH)
  : path.join(__dirname, 'uploads');

app.use('/uploads', express.static(uploadBase));

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/products', require('./routes/products'));
app.use('/api/services', require('./routes/services'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/why-choose-us', require('./routes/whyChooseUs'));
app.use('/api/industries', require('./routes/industries'));
app.use('/api/contact', require('./routes/contact'));

// Global Error Handler
app.use(errorHandler);

module.exports = app;