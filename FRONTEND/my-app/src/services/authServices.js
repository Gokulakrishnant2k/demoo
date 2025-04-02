// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // ✅ Backend URL

// Register User
const register = async (userData) => {
  try {
    const response = await axios.post(`${apiurl}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error registering user' };
  }
};

// Login User
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Invalid credentials' };
  }
};

// Logout User
const logout = () => {
  localStorage.removeItem('user');
};

// Get Current User
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? { ...user, token: user.token } : null;
};

// Update User Profile
const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Profile Update Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error updating profile' };
  }
};

// Reset Password (Forgot Password)
const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Reset Password Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error resetting password' };
  }
};

// Change Password (After login)
const changePassword = async (passwordData, token) => {
  try {
    const response = await axios.put(`${API_URL}/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Change Password Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error changing password' };
  }
};

// Delete Account
const deleteAccount = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    logout(); // Clear user data after account deletion
    return response.data;
  } catch (error) {
    console.error('Account Deletion Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error deleting account' };
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  resetPassword,
  changePassword,
  deleteAccount,
};


