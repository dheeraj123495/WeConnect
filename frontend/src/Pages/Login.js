import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserId } from "../Components/Redux/Slice/PostSlice";
import logo from "../Assets/Logo.png";

const Login = ({ setIsLoggedIn }) => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userEmail === "") {
      toast.error("Please enter email address");
      return;
    }
    if (userPassword === "") {
      toast.error("Please enter password");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        // "https://weconnect-lr69.onrender.com/login",
        { userEmail, userPassword }
      )
      .then((result) => {
        if (result.data.status === "success") {
          toast.success("Login successful!");
          localStorage.setItem('token', result.data.token);
          dispatch(setUserId(result.data.userId));
          navigate("/home");  
        } else {
          toast.error(result.data.message);
        }
      })
      .catch((err) => {
        toast.error("Unable to login");
      });
  };

  useEffect(() => {
    localStorage.removeItem("token");
  },[])

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
          <img
            src={logo}
            alt="weconnect"
            width={150}
            className="justify-center mx-auto mt-[-40px] rounded-xl"
          />
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
                autoComplete="current-password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
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
