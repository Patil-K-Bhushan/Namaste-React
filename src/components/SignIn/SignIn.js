import React from "react";
import "./SignIn.css";
import useSignInForm from "../../hooks/useSignInForm";

const SignIn = () => {
  const { name, setName, handleDone, handleClose } = useSignInForm();

  return (
    <>
      <div className="signin-overlay" onClick={handleClose}></div>
      <div className="signin-container">
        <button className="close-btn" onClick={handleClose}>✕</button>
        <div className="signin-header">
          <div>
            <h1>Name</h1>
            <p><span>Enter your name to be shown in button</span></p>
            <div className="underline"></div>
          </div>
        </div>
        <input type="text" placeholder="Enter your Name here" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="login-btn" onClick={handleDone}>Done</button>
        <p className="terms">By clicking on Done, your <b>Name will be shown in the button</b></p>
      </div>
    </>
  );
};

export default SignIn;
