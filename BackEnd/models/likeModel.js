const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDataModel",
  },
});

module.exports = mongoose.model("Like", likeSchema)