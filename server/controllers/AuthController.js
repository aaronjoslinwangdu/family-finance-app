const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

// @desc    Sign user in.
// @route   POST /api/auth/
// @access  Public
const signIn = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required to sign in' });
  }

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // create access token
  const accessToken = jwt.sign(
    { 
      'UserInfo': {
        'email': user.email
      }
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '10m' }
  );

  // create refresh token
  const refreshToken = jwt.sign(
    { 'email': user.email }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '1d' }
  );

  // create cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: false,                    // set back to true when using https
    secure: false,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});


// @desc    Sign users out
// @route   POST /auth/logout
// @access  Public
const signOut = asyncHandler(async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204);
  }

  res.clearCookie('jwt', {
    httpOnly: false,
    secure: false,
    sameSite: 'None'
  });

  res.json({ message: 'Cookie cleared' });

});


// @desc    Refresh token
// @route   GET /auth/refresh
// @access  Public
const refresh = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'No cookies' });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      
      // error checking
      if (err) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // check for user
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // create access token
      const accessToken = jwt.sign(
        { 
          'UserInfo': {
            'email': user.email
          }
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '15m' }
      );

      res.json({ accessToken });

    })
  )

});

module.exports = {
  signIn,
  signOut,
  refresh
}