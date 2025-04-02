const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense', 'investment', 'transfer'], // ✅ Added new types
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be greater than or equal to zero'], // ✅ Added validation
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true, // ✅ Trim whitespace
      maxlength: 500, // ✅ Limit description length
    },
    recurring: {
      type: Boolean,
      default: false, // ✅ New field to track recurring transactions
    },
    recurrenceInterval: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: function () {
        return this.recurring; // ✅ Required only if recurring is true
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);

