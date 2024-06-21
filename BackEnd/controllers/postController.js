const Post = require("../models/postModel");
const UserDataModel = require("../models/userModel");
const multer = require("multer");
const fs = require("fs");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadImage = upload.single("image");


exports.createPost = async (req, res) => {
  try {
    uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "Error uploading image",
        });
      }
      const { postData, userId } = req.body;
      const post = new Post({
        postData,
        userId,
        image: req.file ? req.file.buffer : undefined,
      });
      const savePost = await post.save();
      const updatedUserInfo = await UserDataModel.findByIdAndUpdate(
        userId,
        {
          $push: { post: savePost._id },
        },
        { new: true }
      );
      res.json({
        success: true,
        post: updatedUserInfo,
        message: "Post saved successfully",
      });
    });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting temporary file:", err);
        }
      });
    }
    return res.status(400).json({
      error: "Error saving post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "comments",
        populate: { path: "userId", select: "userName" }, 
      })
      .populate("likes")
      .populate({ path: "userId", select: "userName" })
      .exec();
    res.json({
      posts: posts.map((post) => ({
        postData: post.postData,
        userId: post.userId,
        image: post.image ? Buffer.from(post.image).toString("base64") : null,
        likes: post.likes,
        comments: post.comments,
        postId: post._id,
      })),
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error getting posts",
    });
  }
};

exports.getUpdatedPost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (postId !== undefined) {
      const post = await Post.findOne({ _id: postId });
      if (post) {
        res.json({
          success: true,
          post: post,
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      error: "Error getting posts",
    });
  }
};
