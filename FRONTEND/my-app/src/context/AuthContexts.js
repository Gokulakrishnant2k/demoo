// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authServices';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app load
  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login user
  const login = async (userData) => {
    try {
      const data = await authService.login(userData);
      setUser(data);
    } catch (error) {
      console.error('Login failed:', error.message || 'Error during login');
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Register user
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data);
    } catch (error) {
      console.error('Registration failed:', error.message || 'Error during registration');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };


