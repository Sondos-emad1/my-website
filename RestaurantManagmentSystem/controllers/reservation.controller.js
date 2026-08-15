const Reservation = require("../models/reservation.model");

// Create reservation
const createReservation = async (req, res) => {
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
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email");

    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get one reservation
const getReservationById = async (req, res) => {
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
};

// Update reservation
const updateReservation = async (req, res) => {
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
};

// Delete reservation
const deleteReservation = async (req, res) => {
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
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};