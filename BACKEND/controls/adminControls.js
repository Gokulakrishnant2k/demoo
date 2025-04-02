// backend/controllers/adminController.js
const User = require('../models/user');

// Get all users (Admin Only)
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// Delete a user (Admin Only)
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getAllUsers, deleteUser };
