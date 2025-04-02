// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const goalRoutes = require('./routes/goalRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); // ✅ Added Transaction Routes
const rateLimit = require('express-rate-limit');
const cors = require('cors');

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Rate Limiting for APIs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // Limit each IP to 100 requests per windowMs
  message: '🚫 Too many requests, please try again later.',
});

// ✅ Apply rate limiter to all /api routes
app.use('/api', limiter);

// ✅ Define Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api', apiRoutes); // General API routes
app.use('/api/goals', goalRoutes); // Goal management routes
app.use('/api/transactions', transactionRoutes); // Transaction routes

// ✅ Define PORT and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



