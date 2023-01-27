const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../models/UserModel');


// @desc    Get a user
// @route   GET /api/users
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  
  const user = await User.find()

  res.status(200).json(user);

});

// @desc    Create a user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {

  const takenUsername = await User.findOne({username: req.body.username});
  const takenEmail = await User.findOne({email: req.body.email});

  if (takenUsername || takenEmail) {
    res.status(400)
    throw new Error('That username or email is already taken!');
  } else {
    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePictureUrl: req.body.profilePictureUrl
    });
  
    res.status(200).json(user);

  }
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedUsere);

});

// @desc    Delete a user
// @route   DEL /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}