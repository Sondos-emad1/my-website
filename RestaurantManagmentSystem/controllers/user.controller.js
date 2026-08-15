const User = require("../models/user.model");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get one user
const getUserById = async (req, res) => {
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
};

// Delete user
const deleteUser = async (req, res) => {
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
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser
};