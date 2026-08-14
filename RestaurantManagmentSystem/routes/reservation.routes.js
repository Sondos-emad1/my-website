const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation.model");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Create reservation
// Customer or Admin
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { fullName, email, date, time, guests } = req.body;

    if (!fullName || !email || !date || !time || !guests) {
      return res.status(400).json({
        message: "All reservation fields are required"
      });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      fullName,
      email,
      date,
      time,
      guests
    });

    res.status(201).json({
      message: "Reservation created successfully",
      reservation
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get all reservations
// Admin only
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const reservations = await Reservation.find()
        .populate("user", "name email");

      res.json(reservations);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Get one reservation
// Admin only
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const reservation = await Reservation.findById(
        req.params.id
      ).populate("user", "name email");

      if (!reservation) {
        return res.status(404).json({
          message: "Reservation not found"
        });
      }

      res.json(reservation);
    } catch (error) {
      res.status(400).json({
        message: "Invalid reservation ID"
      });
    }
  }
);

// Update reservation
// Admin only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!reservation) {
        return res.status(404).json({
          message: "Reservation not found"
        });
      }

      res.json({
        message: "Reservation updated successfully",
        reservation
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
);

// Delete reservation
// Admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(
        req.params.id
      );

      if (!reservation) {
        return res.status(404).json({
          message: "Reservation not found"
        });
      }

      res.json({
        message: "Reservation deleted successfully"
      });
    } catch (error) {
      res.status(400).json({
        message: "Invalid reservation ID"
      });
    }
  }
);

module.exports = router;