const express = require('express');
const router = express.Router();
const {
  getIndustries,
  getIndustryBySlug,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} = require('../controllers/industryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const setUploadFolder = (req, res, next) => {
  req.uploadFolder = 'industries';
  next();
};

router.route('/')
  .get(getIndustries)
  .post(protect, setUploadFolder, upload.single('image'), createIndustry);

router.route('/:slug').get(getIndustryBySlug);

router.route('/:id')
  .put(protect, setUploadFolder, upload.single('image'), updateIndustry)
  .delete(protect, deleteIndustry);

module.exports = router;
