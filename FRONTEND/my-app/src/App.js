// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions'; // ✅ Added Transactions Page
import Navbar from './components/Nav';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContexts';
import { TransactionProvider } from './context/transactionContext'; // ✅ Added Transaction Context
import Goals from './pages/Goals';
// Protect Routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading... ⏳</h2>; // Show loading while user data is being fetched
  }

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <TransactionProvider> {/* ✅ Wrapping with TransactionProvider */}
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Goals />
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;







// import React from 'react';

// function App() {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🚀 Financial Planner App Coming Soon!</h1>
//       <p style={styles.text}>Track, plan, and achieve your financial goals easily.</p>
//     </div>
//   );
// }

// // Inline styles
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     color: '#333',
//     fontSize: '2.5rem',
//   },
//   text: {
//     color: '#666',
//     fontSize: '1.2rem',
//   },
// };

// export default App;

