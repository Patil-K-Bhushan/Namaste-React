import React, { useState, useContext } from "react";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/SignIn.css";

const SignIn = () => {
  const [name, setName] = useState("");

  const { setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDone = () => {
    if (!name.trim()) return;

    setUserName(name);
    navigate("/");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="signin-overlay"
        onClick={handleClose}
      ></div>

      <div className="signin-container">
        <button
          className="close-btn"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="signin-header">
          <div>
            <h1>Name</h1>

            <p>
              <span>Enter your name to be shown in button</span>
            </p>

            <div className="underline"></div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter your Name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleDone}
        >
          Done
        </button>

        <p className="terms">
          By clicking on Done, your
          <b> Name will be shown in the button</b>
        </p>
      </div>
    </>
  );
};

export default SignIn;