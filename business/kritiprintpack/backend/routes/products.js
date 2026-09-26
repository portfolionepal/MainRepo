const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

// Middleware to set upload folder dynamically for multer
const setUploadFolder = (req, res, next) => {
  req.uploadFolder = 'products';
  next();
};

router.route('/')
  .get(getProducts)
  .post(protect, setUploadFolder, upload.single('image'), createProduct);

router.route('/:slug').get(getProductBySlug);

router.route('/:id')
  .put(protect, setUploadFolder, upload.single('image'), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
