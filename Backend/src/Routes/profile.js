const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");
const protect = require("../middleware/authMiddleware");

// Private routes — user must be logged in
router.route("/")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
