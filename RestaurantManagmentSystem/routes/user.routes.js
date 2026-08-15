const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  getAllUsers,
  getUserById,
  deleteUser
} = require("../controllers/user.controller");

// Get all users - Admin only
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// Get one user - Admin only
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getUserById
);

// Delete user - Admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;