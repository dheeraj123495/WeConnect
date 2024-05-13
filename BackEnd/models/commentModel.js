const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // reference to the post model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDataModel",
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);