import { useEffect, useState } from 'react';
import { useTransactions } from '../context/transactionContext';

const Transactions = () => {
  const {
    transactions,
    loading,
    fetchTransactions,
    createTransaction,
    modifyTransaction,
    removeTransaction,
  } = useTransactions();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      type: 'expense',
      category: 'Food',
      amount: 500,
      date: new Date(),
      description: 'Lunch',
    };
    createTransaction(newTransaction);
  };

  return (
    <div>
      <h2>📊 Transactions</h2>

      {/* ✅ Add Transaction Button */}
      <button onClick={handleAddTransaction}>➕ Add Transaction</button>

      {loading ? (
        <p>Loading transactions... ⏳</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <strong>{transaction.category}</strong> - ₹{transaction.amount}{' '}
              <button onClick={() => modifyTransaction(transaction._id, { amount: 1000 })}>
                ✏️ Edit
              </button>
              <button onClick={() => removeTransaction(transaction._id)}>❌ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
