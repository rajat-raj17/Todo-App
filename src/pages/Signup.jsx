/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ username, password });
  };

  const onSignUp = ({ username, password }) => {
    if (username === "") {
      showToast("Enter a valid username", "error");
      return;
    }
    if (password === "") {
      showToast("Enter a valid password", "error");
      return;
    }

    const data = JSON.parse(localStorage.getItem("user")) || [];

    const usernameMatched = data.find((x) => x.username === username);
    if (usernameMatched) {
      showToast("Username already present", "error");
      navigate("/login");
      return;
    }

    data.push({ name, email, username, password });
    localStorage.setItem("user", JSON.stringify(data));
    showToast("Registered successfully", "success");
    navigate("/login");
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <label>
          Your Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Your Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
        <br />
        <label>
          Already have an account?{" "}
          <Link to="/login">
            <button
              style={{
                backgroundColor: "tomato",
                padding: "5px",
                marginLeft: "5px",
              }}
              type="submit"
            >
              Log In
            </button>
          </Link>
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-evenly",
            width: "60%",
            margin: ".4rem auto",
          }}
        ></div>
      </form>
    </div>
  );
};

export default Signup;
