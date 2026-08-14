const express = require("express");
const router = express.Router();

const Menu = require("../models/menu.model");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload.middleware");

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();

    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get one menu item
router.get("/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({
      message: "Invalid menu item ID"
    });
  }
});

// Add menu item - Admin only + Image upload
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      if (!name || !description || !price || !category) {
        return res.status(400).json({
          message: "All menu fields are required"
        });
      }

      const item = await Menu.create({
        name,
        description,
        price,
        category,
        image: req.file ? `/uploads/${req.file.filename}` : null
      });

      res.status(201).json({
        message: "Menu item created successfully",
        item
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Update menu item - Admin only + Image upload
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      const updateData = {
        name,
        description,
        price,
        category
      };

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const item = await Menu.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

      if (!item) {
        return res.status(404).json({
          message: "Menu item not found"
        });
      }

      res.json({
        message: "Menu item updated successfully",
        item
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Delete menu item - Admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const item = await Menu.findByIdAndDelete(req.params.id);

      if (!item) {
        return res.status(404).json({
          message: "Menu item not found"
        });
      }

      res.json({
        message: "Menu item deleted"
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;