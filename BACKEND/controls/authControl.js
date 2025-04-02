// backend/controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/notification'); // ✅ Import sendEmail

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route POST /api/auth/signup
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create New User
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      // 🎉 Send Welcome Email
      await sendEmail(
        email,
        '🎉 Welcome to Financial Planner',
        `Hi ${name},\n\nThanks for signing up! Let's secure your future together. 🚀`
      );

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data!' });
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Error registering user!' });
  }
};

// @route POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password!' });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Error logging in!' });
  }
};

// @route POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please provide your email!' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // ✅ Generate Reset Token
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // ✅ Send Reset Email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail(
      email,
      '🔒 Password Reset Request',
      `Hi ${user.name},\n\nClick the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour.`
    );

    res.status(200).json({ message: 'Password reset email sent!' });
  } catch (error) {
    console.error('Error in forgot password:', error.message);
    res.status(500).json({ message: 'Error sending reset email!' });
  }
};

// @route POST /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Please provide a new password!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // ✅ Hash New Password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(401).json({ message: 'Invalid or expired token!' });
  }
};

module.exports = { signupUser, loginUser, forgotPassword, resetPassword };


