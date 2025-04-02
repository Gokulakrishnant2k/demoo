const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers, // 👈 Admin gets all users
  deleteUserById, // 👈 Admin deletes user by ID
} = require('../controllers/userController');
const { protect, admin } = require('../MiddleWare/authMiddleWare'); // 👈 Import admin too

const router = express.Router();

// ✅ User Routes
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

// 👑 ✅ Admin Routes
router.route('/').get(protect, admin, getAllUsers); // Admin fetches all users
router.route('/:id').delete(protect, admin, deleteUserById); // Admin deletes user by ID

module.exports = router;
