const express = require('express');
const router = express.Router();


const { createComment } = require("../controllers/commentController");
const { likePost } = require("../controllers/likeController");
const {
  createPost,
  getAllPosts,
  getUpdatedPost,
} = require("../controllers/postController");
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/likes/likepost", likePost);
router.post("/comments/create", createComment);
router.post("/createPost", createPost);
router.get("/posts/getAllPosts", getAllPosts);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/posts/getUpdatedPost", getUpdatedPost);

module.exports = router;