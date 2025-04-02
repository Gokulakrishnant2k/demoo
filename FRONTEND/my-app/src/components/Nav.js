// src/components/Nav.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContexts';
import './Nav.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link logo">
        💸 FinPlan
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              📊 Dashboard
            </Link>
            <Link to="/profile" className="nav-link">
              👤 Profile
            </Link>
            <button onClick={logout} className="nav-button logout">
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              🔐 Login
            </Link>
            <Link to="/register" className="nav-link">
              📝 Register
            </Link>
          </>
        )}
        <button onClick={toggleDarkMode} className="nav-button dark-mode">
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


