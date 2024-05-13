const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    required: true,
    type: String,
  },
  userEmail: {
    required: true,
    type: String,
  },
  userPassword: {
    required: true,
    type: String,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model('UserDataModel', userSchema)

