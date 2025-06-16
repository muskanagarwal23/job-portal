const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

const uploadProfileImage = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resumeFile', maxCount: 1 },
]);

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  res.status(200).json({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileImage: user.profileImage ? `/uploads/${path.basename(user.profileImage)}` : null,
    resumeFile: user.resumeFile ? `/uploads/${path.basename(user.resumeFile)}` : null
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const updates = {
    name: req.body.name,
    phone: req.body.phone
  };

  if (req.files?.profileImage?.[0]) {
    updates.profileImage = req.files.profileImage[0].path;
  }

  if(req.files?.resumeFile?.[0]){
    updates.resumeFile = req.files.resumeFile[0].path;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { 
    new: true 
  }).select('-password');

  res.status(200).json({
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    profileImage: updatedUser.profileImage ? `/uploads/${path.basename(updatedUser.profileImage)}` : null,
     resumeFile: updatedUser.resumeFile ? `/uploads/${path.basename(updatedUser.resumeFile)}` : null
  });
});

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage
};