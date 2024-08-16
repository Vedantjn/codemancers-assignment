const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-auth-token');
  console.log('Received token:', token);  // Add this line

  if (!token) {
    console.log('No token provided');  // Add this line
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('Decoded user:', req.user);  // Add this line
    next();
  } catch (err) {
    console.error('Token verification error:', err);  // Add this line
    res.status(401).json({ message: 'Token is not valid' });
  }
};