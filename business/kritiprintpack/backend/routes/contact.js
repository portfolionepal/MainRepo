const express = require('express');
const router = express.Router();
const {
  getContactInfo,
  updateContactInfo,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getContactInfo)
  .put(protect, updateContactInfo);

module.exports = router;
