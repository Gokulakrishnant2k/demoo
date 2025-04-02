// src/pages/Home.js
import React from 'react';
import Button from '../components/Button';
import Hero from '../components/Hero';
import '../Styles/Home.css'; // ✅ Imported CSS for home page styling

const Home = () => {
  // Button click handler
  const handleButtonClick = () => {
    alert('Let’s Start Planning Your Goals! 🎯');
  };

  return (
    <>
      {/* Hero Section at the Top */}
      <Hero />

      {/* Main Content Section */}
      <div className="home-container">
        <h1>Welcome to Financial Planner 💸</h1>
        <p>Manage your goals, track your expenses, and secure your future.</p>

        {/* Button with props */}
        <Button text="Get Started 🚀" onClick={handleButtonClick} />
      </div>
    </>
  );
};

export default Home;




