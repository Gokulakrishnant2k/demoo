import { createContext, useReducer, useContext, useEffect } from 'react';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transactionAPI';
import { AuthContext } from './AuthContexts';

const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction._id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const TransactionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: [],
    loading: true,
  });

  // ✅ Fetch Transactions on Load
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async (filters = {}) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const data = await getTransactions(user.token, filters);
      dispatch({ type: 'GET_TRANSACTIONS', payload: data });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // ✅ Add Transaction
  const createTransaction = async (transactionData) => {
    try {
      const data = await addTransaction(transactionData, user.token);
      dispatch({ type: 'ADD_TRANSACTION', payload: data });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // ✅ Update Transaction
  const modifyTransaction = async (id, transactionData) => {
    try {
      const data = await updateTransaction(id, transactionData, user.token);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: data });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // ✅ Delete Transaction
  const removeTransaction = async (id) => {
    try {
      await deleteTransaction(id, user.token);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        fetchTransactions,
        createTransaction,
        modifyTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
