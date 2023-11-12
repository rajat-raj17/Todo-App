/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem("user"));
  const activePerson = data?.find((x) => x.isactive);

  const logout = () => {
    let data = JSON.parse(localStorage.getItem("user"));
    data = data.map((obj) => ({ ...obj, isactive: false }));
    localStorage.setItem("user", JSON.stringify(data));

    // Using react-toastify to show a success message
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <main className="home">
      <header className="header">
        <div className="logout">
          {activePerson ? (
            <Link
              to={"/login"}
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>
          ) : (
            <div>
              <Link
                to={"/"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginInline: "1rem",
                }}
              >
                Signup
              </Link>
              <Link
                to={"/login"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </header>
      <div className="outlet">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
