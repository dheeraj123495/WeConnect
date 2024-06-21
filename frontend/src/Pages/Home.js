import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const userId = useSelector((state) => state.userId.id);
  const loadData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/posts/getAllPosts`
        // "http://192.168.1.5:3001/posts/getAllPosts"
      )
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (posts.length > 0) { 
    }
  }, [posts]);
  return (
    <div>
      <Navbar />
      <div className="flex  flex-col gap-10 mb-4 justify-center">
        {posts.map((post) => (
          <Card
            post={post}
            key={post.postId}
            userId={userId}
            loadData={loadData}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
