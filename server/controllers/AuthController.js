const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

const signIn = asyncHandler(async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) {
    res.status(401);
    throw new Error('Invalid password')
  }

  const token = jwt.sign({
    id: user._id
  }, process.env.API_SECRET, {
    expiresIn: 86400
  });

  res.status(200).send({
    user, 
    message: 'Sign in successful',
    accessToken: token
  });

});

module.exports = {
  signIn
}