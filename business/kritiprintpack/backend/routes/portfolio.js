const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const setUploadFolder = (req, res, next) => {
  req.uploadFolder = 'portfolio';
  next();
};

router.route('/')
  .get(getPortfolio)
  .post(protect, setUploadFolder, upload.single('image'), createPortfolio);

router.route('/:slug').get(getPortfolioBySlug);

router.route('/:id')
  .put(protect, setUploadFolder, upload.single('image'), updatePortfolio)
  .delete(protect, deletePortfolio);

module.exports = router;
