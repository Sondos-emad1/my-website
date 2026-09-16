const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  createReservation,
  getMyReservations,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require("../controllers/reservation.controller");


// Create reservation
// Customer or Admin
router.post(
  "/",
  authMiddleware,
  createReservation
);


// Get current user's reservations
// Customer or Admin
router.get(
  "/my",
  authMiddleware,
  getMyReservations
);


// Get all reservations
// Admin only
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllReservations
);


// Get one reservation
// Admin only
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getReservationById
);


// Update reservation
// Admin only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateReservation
);


// Delete reservation
// Admin only
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteReservation
);


module.exports = router;