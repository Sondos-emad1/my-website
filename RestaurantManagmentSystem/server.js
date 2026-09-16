const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");
const reservationRoutes = require("./routes/reservation.routes");
const userRoutes = require("./routes/user.routes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Static files
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);


// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Restaurant Management System API is running"
  });
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  })
  .catch((error) => {

    console.error("MongoDB connection error:", error);

  });