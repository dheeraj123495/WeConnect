import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../Assets/Logo.png";

const Register = () => {
  const [userName, setName] = useState();
  const [userEmail, setEmail] = useState();
  const [userPassword, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(process.env.REACT_APP_BASE_URL);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        //  "http://192.168.1.3:3001/register",
        {
          userName,
          userEmail,
          userPassword,
        }
      )
      .then((result) => {
        console.log(result);
        if (result.data === "Email Already registered") {
          toast.success("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          toast.success("Registered successfully!");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error: " + err.message);
        console.log(userName, userEmail, userPassword);
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
          <img
            src={logo}
            alt="weconnect"
            width={150}
            className="justify-center mx-auto mt-[-40px] rounded-xl"
          />
          <h2 className="mb-2 text-primary font-bold text-2xl">Register</h2>
          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label htmlFor="exampleInputname" className="form-label">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                id="exampleInputname"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
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
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          <p className="container my-2">Already have an account ?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
