import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserId } from "../Components/Redux/Slice/PostSlice";

const Login = ({ setIsLoggedIn }) => {
  const [userEmail, setEmail] = useState();
  const [userPassword, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://192.168.1.6:3001/login", { userEmail, userPassword })
      .then((result) => {
        if (result.data.status === "success") {
          toast.success("Login successful!");
          dispatch(setUserId(result.data.userId));
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          toast.error(result.data.message);
          setIsLoggedIn(false);
          navigate("/register");
        }
      })
      .catch((err) => {
        console.log(err)
        console.log("Error: " + err.message)
      });
  };

  return (
    <div>
      <div
        className="flex justify-center items-center text-center min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
        }}
      >
        <div className="bg-white p-3 rounded w-full md:w-[30%] max-w-[400px]">
          <h2 className="mb-2 text-primary font-bold text-2xl">Login</h2>
          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="container my-2">Don&apos;t have an account?</p>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
