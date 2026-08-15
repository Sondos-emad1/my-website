const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");

const {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} = require("../controllers/menu.controller");

// Get all menu items
router.get("/", getAllMenu);

// Get one menu item
router.get("/:id", getMenuById);

// Add menu item - Admin only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createMenu
);

// Update menu item - Admin only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateMenu
);

// Delete menu item - Admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteMenu
);

module.exports = router;