const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const menuRoutes = require("./routes/menu.routes");
const reservationRoutes = require("./routes/reservation.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Restaurant Management System API is running"
  });
});

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