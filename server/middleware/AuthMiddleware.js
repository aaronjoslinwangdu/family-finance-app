const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const verifyJwt = (req, res, next) => {
  
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token'});
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Access Forbidden' });
      }
      req.user = decoded.UserInfo.email;
      next();
    }
  );

}

module.exports = verifyJwt;
