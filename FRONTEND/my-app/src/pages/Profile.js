// src/pages/Profile.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContexts';
import authService from '../services/authServices';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error
  const [loading, setLoading] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  // Update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate password confirmation
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match! ❌');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const updatedData = { ...formData };
      if (!formData.password) {
        delete updatedData.password; // Remove password if not updating
        delete updatedData.confirmPassword;
      }
      const updatedUser = await authService.updateProfile(updatedData, user.token);
      setUser(updatedUser); // Update user in context
      setMessage('Profile updated successfully! 🎉');
      setMessageType('success');
    } catch (error) {
      setMessage(error.message || 'Error updating profile. ❌');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>👤 Update Your Profile</h1>

      {/* Display Message */}
      {message && (
        <p style={messageType === 'success' ? styles.successMessage : styles.errorMessage}>
          {message}
        </p>
      )}

      <form onSubmit={handleUpdate} style={styles.form}>
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Enter new password (optional)"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Confirm Password Input */}
        {formData.password && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
        )}

        {/* Update Button */}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  successMessage: {
    marginBottom: '15px',
    color: 'green',
    fontWeight: 'bold',
  },
  errorMessage: {
    marginBottom: '15px',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default Profile;
