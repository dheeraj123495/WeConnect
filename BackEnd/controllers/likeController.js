const Post = require("../models/postModel");

const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.user;
    await Like.findOne({ postId: postId, userId: userId }).then(
      async (likeData) => {
        if (likeData) {
          const deleteLike = await Like.findOneAndDelete({ postId: postId, userId: userId });
          
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: deleteLike._id } },
            { new: true }
          );

          res.json({
            message: "unlike",
          });
        } else {
          const response = await Like.create({ postId: postId, userId: userId });
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { likes: response._id } },
            { new: true }
          );
          res.json({
            message: "liked",
          });
        }
      }
    );
  } catch (err) {
    return res.json({
      message: "Error liking post",
    });
  }
};

