/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setSuccess(!success);
    const data = JSON.parse(localStorage.getItem("user"));
    const activePerson = data?.find((x) => x.isactive);
    setSuccess(activePerson?.isactive || false);
    if (activePerson?.isactive) navigate("/login/todo");
  }, []);

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
    onLogin({ username, password });
  };

  const onLogin = ({ username, password }) => {
    if (username === "") {
      showToast("Enter a valid username", "error");
      return;
    }

    if (password === "") {
      showToast("Enter a valid password", "error");
      return;
    }

    let data = JSON.parse(localStorage.getItem("user"));

    if (!data) {
      showToast("User not found", "error");
      navigate("/");
      return;
    }

    const usernameMatched = data.find((x) => x.username === username);
    if (!usernameMatched) {
      showToast("Username does not exist", "error");
      return;
    }

    const userpassMatched = data.find(
      (x) => x.username === username && x.password === password
    );

    if (!userpassMatched) {
      showToast("Wrong password", "error");
      return;
    }

    showToast("Logged in successfully", "success");

    const updatedData = data.map((obj) => {
      if (obj.username === username) return { ...obj, isactive: true };
      return obj;
    });

    data = updatedData;
    localStorage.setItem("user", JSON.stringify(data));
    setSuccess(true);
    navigate("/login/todo");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: "black", textShadow: "1px 1px 2px currentColor" }}>
          LOG IN
        </h1>
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
        <button type="submit">Log In</button>
        <br />
        <label>
          Don't have an account?
          <Link to="/">
            <button
              style={{
                backgroundColor: "tomato",
                padding: "5px",
                marginLeft: "5px",
              }}
              type="submit"
            >
              Create
            </button>
          </Link>
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-evenly",
            width: "20%",
            margin: ".4rem auto",
          }}
        ></div>
      </form>
    </div>
  );
};

export default Login;
