const express = require("express");
const router = express.Router();
const {
  getDashboard,
  getEmployerInfo,
} = require("../controllers/employerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, authorize("employer"), getDashboard);

module.exports = router;
