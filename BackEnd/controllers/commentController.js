const Post = require("../models/postModel");

const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const { postId, body } = req.body;
    const { userId } = req.user;
    const comment = new Comment({
      postId,
      userId,
      body,
    });

    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.status(200).json({
      succcess: true,
      data: updatedPost,
      message: "Comment saved successfully",
    });
  } catch (err) {
    return res.json({
      message: "Error saving comment",
    });
  }
};
