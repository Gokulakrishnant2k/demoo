// backend/models/transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify transaction type'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
