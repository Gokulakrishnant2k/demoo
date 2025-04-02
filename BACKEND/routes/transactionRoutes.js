const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById, // ✅ Get single transaction by ID
} = require('../controllers/transactionController');
const { protect } = require('../MiddleWare/authMiddleware');

// ✅ Protect all transaction routes
router
  .route('/')
  .get(protect, getTransactions) // Get all transactions
  .post(protect, addTransaction); // Add new transaction

router
  .route('/:id')
  .get(protect, getTransactionById) // ✅ Get a single transaction
  .put(protect, updateTransaction) // ✅ Update transaction
  .delete(protect, deleteTransaction); // Delete transaction

// ✅ Get transactions by category or date range
router.route('/filter').post(protect, getTransactions); // Filter route (optional)

module.exports = router;


