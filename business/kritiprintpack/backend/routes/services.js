const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const setUploadFolder = (req, res, next) => {
  req.uploadFolder = 'services';
  next();
};

router.route('/')
  .get(getServices)
  .post(protect, setUploadFolder, upload.single('image'), createService);

router.route('/:slug').get(getServiceBySlug);

router.route('/:id')
  .put(protect, setUploadFolder, upload.single('image'), updateService)
  .delete(protect, deleteService);

module.exports = router;
