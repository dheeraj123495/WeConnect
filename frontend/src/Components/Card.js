import React, {  useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import "../Assets/Scroller.css"

const Card = ({ post, userId, loadData }) => {
  const [likeCount, updateLikeCount] = useState(post.likes.length);
  const [userComment, setUserComment] = useState("");
  const [commentCount, updateCommentCount] = useState(post.comments.length);
  const likePost = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/likes/likepost`,
        {
          postId: post.postId,
          userId: userId,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/posts/getUpdatedPost`,
            {
              postId: post.postId,
            }
          )
          .then((res) => {
            updateLikeCount(res.data.post.likes.length);
          });
      })
      .catch((err) => {
        console.log("Failed");
      });
  };

  function isPostLikedByUser(postsLikeArray, postId, userId) {
    if (
      postsLikeArray.find(
        (post) => post.postId === postId && post.userId === userId
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    loadData();
  }, [likeCount, commentCount]);
  
  const submitComment = () => {
    console.log(post.postId, userId, userComment);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/comments/create`,
        {
          postId: post.postId,
          userId: userId,
          body: userComment,
        }
      )
      .then((res) => {
        toast.success("Commented Successfully");
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/posts/getUpdatedPost`,
            {
              postId: post.postId,
            }
          )
          .then((res) => {
            updateCommentCount(res.data.post.comments.length);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <div>
      <div
        className="flex w-full max-w-[600px] p-2 rounded-md shadow-md mx-auto gap-x-5 gap-y-5 bg-pink-50"
        key={post.postId}
      >
        <div className="w-full md:w-6/12 max-w-[400px]">
          <p className="font-bold text-2xl text-black mb-2">{post.userName}</p>
          {post.image && (
            <img
              src={`data:image/jpeg;base64,${post.image}`}
              alt="Pics Not Available"
              className="w-full h-auto"
            />
          )}
          <p className="">{post.postData}</p>
          <div className="flex items-center">
            {isPostLikedByUser(post.likes, post.postId, userId) ? (
              <FcLike
                size="1.5em"
                className="cursor-pointer mt-1"
                onClick={() => likePost()}
              />
            ) : (
              <FcLikePlaceholder
                size="1.5em"
                className="cursor-pointer mt-1"
                onClick={() => likePost()}
              />
            )}
            <div className="relative ml-5 mb-3">
              <FaComment className="absolute text-red-300" size="1.5em" />
              <p>
                <span className="absolute left-3  text-black animate-bounce">
                  {commentCount}
                </span>
              </p>
            </div>
          </div>
          <p className="mt-1 ml-1">
            <span>{likeCount} Likes </span>
          </p>
        </div>
        <div className="relative w-full md:w-10/12 max-w-[450px] h-[280px] overflow-y-auto scrollbar-w-2 scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <div>
            <input
              required
              type="text"
              placeholder="New Comment"
              name="text"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="rounded-[0.5rem] px-[12px] py-[6px] text-richblack-5 border mt-1 border-richblack-700 w-full"
            />
            <button
              className="bg-pink-300 mt-1 px-2 py-1 rounded-md text-1xl font-bold hover:bg-pink-400 transition duration-300"
              onClick={() => submitComment()}
            >
              Comment
            </button>
          </div>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => {
              return (
                <div key={comment._id} className="mt-1">
                  <p className="font-sans">
                    {comment.userId.userName} : {comment.body}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="font-bold">No comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
