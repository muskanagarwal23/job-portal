const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/profileController");

// console.log({
//   getProfile,
//   updateProfile,
//   uploadProfileImage
// });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router
  .route("/profile")
  .get(protect, authorize("employee"), getProfile)
  .put(protect, authorize("employee"), uploadProfileImage, updateProfile);
//console.log({ getProfile, updateProfile, uploadProfileImage });

router.get("/job-data", protect, authorize("employer"), (req, res) => {
  res.json({ message: "Employer access only" });
});
module.exports = router;
