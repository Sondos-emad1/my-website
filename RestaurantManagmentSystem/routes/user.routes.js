const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Get current user profile
// Logged-in users only
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        message: "Profile retrieved successfully",
        user
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Get all users
// Admin only
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find().select("-password");

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Get one user
// Admin only
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({
        message: "Invalid user ID"
      });
    }
  }
);

// Delete user
// Admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        message: "User deleted successfully"
      });
    } catch (error) {
      res.status(400).json({
        message: "Invalid user ID"
      });
    }
  }
);

module.exports = router;