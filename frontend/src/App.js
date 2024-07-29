import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PostUpload from "./Pages/PostUpload";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/home"
            element={<Home />
            }
          />
          <Route
            path="/postupload"
            element={
                <PostUpload />
            }
          />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

export default App;
