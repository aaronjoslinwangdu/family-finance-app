const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

// @desc    Sign user in.
// @route   POST /api/auth/
// @access  Public
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


// @desc    Sign users out
// @route   POST /api/auth/logout
// @access  Public
const signOut = asyncHandler(async (req, res) => {

});


// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Public
const refresh = asyncHandler(async (req, res) => {

});


// @desc    Check if a token is valid
// @route   POST /api/auth/
// @access  Private
const isAuthenticated = asyncHandler(async (req, res) => {
  const token = req.accessToken;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
      if (err) {
        throw new Error(err);
        res.status(404).send("Invalid token");
      } else {
        res.status(200).end();
      }
    });
  }
});

module.exports = {
  signIn,
  isAuthenticated
}