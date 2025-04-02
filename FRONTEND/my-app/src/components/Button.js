// src/components/Button.js
import React from 'react';
import './Button.css'; // ✅ Keep styles linked correctly

// Default props added for flexibility
const Button = ({ text = 'Click Me!', onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;



