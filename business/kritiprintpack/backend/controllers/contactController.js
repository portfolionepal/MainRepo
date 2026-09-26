const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Get contact info (single record)
// @route   GET /api/contact
// @access  Public
const getContactInfo = asyncHandler(async (req, res) => {
  const contact = await prisma.contactInfo.findFirst();
  res.json({ success: true, data: contact });
});

// @desc    Update/Upsert contact info
// @route   PUT /api/contact
// @access  Private/Admin
const updateContactInfo = asyncHandler(async (req, res) => {
  const {
    name, address, phone, mobile, email, mapUrl,
    facebookUrl, twitterUrl, linkedinUrl, workingHours
  } = req.body;

  if (!name || !address || !phone || !email) {
    res.status(400);
    throw new Error('Name, address, phone and email are required');
  }

  // Find existing record
  let contact = await prisma.contactInfo.findFirst();

  if (contact) {
    contact = await prisma.contactInfo.update({
      where: { id: contact.id },
      data: {
        name, address, phone, mobile, email, mapUrl,
        facebookUrl, twitterUrl, linkedinUrl, workingHours
      },
    });
  } else {
    contact = await prisma.contactInfo.create({
      data: {
        name, address, phone, mobile, email, mapUrl,
        facebookUrl, twitterUrl, linkedinUrl, workingHours
      },
    });
  }

  res.json({ success: true, data: contact });
});

module.exports = {
  getContactInfo,
  updateContactInfo,
};
