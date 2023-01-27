const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: Number,
      required: true
    }, 
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    profilePictureUrl: {
      type: String
    }
  }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);