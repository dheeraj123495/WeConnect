const express = require('express');
const router = express.Router();

const { auth } = require("../middleWare/auth")
const { createComment } = require("../controllers/commentController");
const { likePost } = require("../controllers/likeController");
const {
  createPost,
  getAllPosts,
  getUpdatedPost,
} = require("../controllers/postController");
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/likes/likepost", auth,likePost);
router.post("/comments/create",auth, createComment);
router.post("/createPost", auth, createPost);
router.get("/posts/getAllPosts",auth, getAllPosts);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/posts/getUpdatedPost", auth, getUpdatedPost);

module.exports = router;