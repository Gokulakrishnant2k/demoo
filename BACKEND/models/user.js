// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // ✅ Added phoneNumber here!
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
  role: {
    type: String,
    enum: ['user', 'admin'], // 👈 Role can be either "user" or "admin"
    default: 'user', // 👈 Default role is "user"
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);


