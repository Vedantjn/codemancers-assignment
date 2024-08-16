const User = require('../models/User');

module.exports = function(role) {
  return async function(req, res, next) {
    try {
      const user = await User.findById(req.user.id);
      if (user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
};