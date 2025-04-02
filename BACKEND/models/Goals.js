const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter goal name'],
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please enter target amount'],
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Please set a deadline'],
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Failed'],
      default: 'In Progress',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
