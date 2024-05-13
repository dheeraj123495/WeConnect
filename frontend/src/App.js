import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PostUpload from "./Pages/PostUpload";
import PrivateRoute from "./Components/PrivateRouter"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/postupload" element={<PostUpload />} /> */}
          <Route
            path="/home"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/postupload"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <PostUpload />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
