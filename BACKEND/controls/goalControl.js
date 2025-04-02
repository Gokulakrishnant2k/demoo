const Goal = require('../models/Goal');
const { sendSMS } = require('../utils/notification');

// @route POST /api/goals
// @desc Create a new goal
// @access Private
const createGoal = async (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  // Validate required fields
  if (!name || !targetAmount || !deadline) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const goal = await Goal.create({
      user: req.user.id,
      name,
      targetAmount,
      deadline,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
};

// @route GET /api/goals
// @desc Get all goals for the user
// @access Private
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ deadline: 1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
};

// @route PUT /api/goals/:id
// @desc Update a goal
// @access Private
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this goal' });
    }

    const { name, targetAmount, currentAmount, deadline, status } = req.body;

    goal.name = name || goal.name;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.currentAmount = currentAmount !== undefined ? currentAmount : goal.currentAmount;
    goal.deadline = deadline || goal.deadline;
    goal.status = status || goal.status;

    // Check if goal is achieved and update status
    if (goal.currentAmount >= goal.targetAmount && goal.status !== 'Completed') {
      goal.status = 'Completed';
      await goal.save();

      // 🎯 Send SMS notification for goal completion
      if (req.user.phoneNumber) {
        await sendSMS(
          req.user.phoneNumber,
          `🎉 Congrats! You've achieved your goal: "${goal.name}" with ₹${goal.currentAmount}!`
        );
      }
    }

    const updatedGoal = await goal.save();
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
};

// @route DELETE /api/goals/:id
// @desc Delete a goal
// @access Private
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this goal' });
    }

    await goal.deleteOne();
    res.status(200).json({ message: 'Goal removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};

