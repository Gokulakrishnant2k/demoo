const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ✅ Protect Routes (User Auth)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
};

// 👑 ✅ Admin Middleware for Role Check
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Admin allowed
  } else {
    res.status(403).json({ message: 'Not authorized as admin' }); // 🚫 Deny non-admins
  }
};

module.exports = { protect, admin };

