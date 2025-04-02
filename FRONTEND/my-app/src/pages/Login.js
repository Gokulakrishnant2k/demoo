import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authServices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 👈 For redirection after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const res = await authService.login(userData);

      if (res.token) {
        console.log('Login successful ✅');
        navigate('/dashboard'); // 👈 Redirect to Dashboard
      }
    } catch (err) {
      alert('Invalid email or password 🚫');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login to Your Account 🔐</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
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
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;

