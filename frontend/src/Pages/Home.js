import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userId = useSelector((state) => state.userId.id);
  const navigate = useNavigate();

  const loadData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/posts/getAllPosts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        toast.error("Session timeout, login again");
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 mb-4 justify-center">
        {posts.map((post) => (
          <Card post={post} key={post.postId} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
