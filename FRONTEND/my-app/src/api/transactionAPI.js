import axios from 'axios';

const API_URL = '/api/transactions/';

// ✅ Get All Transactions with optional filters
export const getTransactions = async (token, filters = {}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: filters, // Pass filters to the backend
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// ✅ Add New Transaction
export const addTransaction = async (transactionData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, transactionData, config);
  return response.data;
};

// ✅ Update Transaction
export const updateTransaction = async (id, transactionData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${API_URL}${id}`, transactionData, config);
  return response.data;
};

// ✅ Delete Transaction
export const deleteTransaction = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};
