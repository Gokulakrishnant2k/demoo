import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authServices'; // ✅ Import API service

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // ✅ For redirection after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match! 🚫');
      return;
    }

    try {
      const userData = { name, email, password };
      await authService.register(userData); // ✅ API call
      console.log('Registration successful ✅');
      navigate('/login'); // ✅ Redirect to login after registration
    } catch (err) {
      alert('Error registering user! 😢');
      console.error('Registration error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Your Account 📝</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Register;

