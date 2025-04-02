const Transaction = require('../models/Transaction');

// @desc Get all transactions for a user
// @route GET /api/transactions
// @access Private
const getTransactions = async (req, res) => {
  const { category, startDate, endDate } = req.query;

  let query = { user: req.user.id };

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Filter by date range if provided
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// @desc Add a new transaction
// @route POST /api/transactions
// @access Private
const addTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;

  if (!type || !category || !amount || !date) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const transaction = new Transaction({
      user: req.user.id,
      type,
      category,
      amount,
      date,
      description,
    });
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction' });
  }
};

// @desc Update a transaction
// @route PUT /api/transactions/:id
// @access Private
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized action' });
    }

    const { type, category, amount, date, description } = req.body;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.amount = amount || transaction.amount;
    transaction.date = date || transaction.date;
    transaction.description = description || transaction.description;

    const updatedTransaction = await transaction.save();
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
};

// @desc Delete a transaction
// @route DELETE /api/transactions/:id
// @access Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized action' });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction, // ✅ Update included
  deleteTransaction,
};


