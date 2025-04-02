// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // ✅ Connect to MongoDB using MONGO_URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // ✅ Log MongoDB connection success
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // ❌ Log connection error and exit process
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

