const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const ddbUserId = user.findOne({_id : userId})._conditions._id
    
    if (!ddbUserId) {
      throw 'Invalid user ID';
    } 
      next();
    
  } catch {
    res.status(403).json({
      error: new Error('unauthorized request!')
    });
  }
};