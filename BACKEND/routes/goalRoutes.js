const express = require('express');
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');
const { protect } = require('../MiddleWare/authMiddleware'); 

const router = express.Router();

// @route   POST /api/goals
// @desc    Create a new goal
// @access  Private
router.post('/', protect, createGoal);

// @route   GET /api/goals
// @desc    Get all goals for the user
// @access  Private
router.get('/', protect, getGoals);

// @route   PUT /api/goals/:id
// @desc    Update a goal
// @access  Private
router.put('/:id', protect, updateGoal);

// @route   DELETE /api/goals/:id
// @desc    Delete a goal
// @access  Private
router.delete('/:id', protect, deleteGoal);

module.exports = router;

