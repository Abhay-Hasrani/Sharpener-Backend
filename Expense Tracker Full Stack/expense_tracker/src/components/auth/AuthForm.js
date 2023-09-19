import React from "react";
import "./AuthForm.css";

const AuthForm = (props) => {
  return (
    <div className="auth-form-box">
      <form
        className="auth-form"
        method="POST"
        action="http://localhost:3000/auth/signUp"
        onSubmit={props.formObj.onSubmit}
      >
        <span className="auth-title">{props.formObj.title}</span>
        <span className="auth-subtitle">{props.formObj.subtitle}</span>
        <div className="auth-form-container">
          {props.formObj.showUserName && (
            <input
              type="text"
              name="username"
              className="auth-input"
              placeholder="Full Name"
              required
            />
          )}
          {props.formObj.showEmail && (
            <input
              type="email"
              className="auth-input"
              name="email"
              placeholder="Email"
              required
            />
          )}
          {props.formObj.showPassword && (
            <input
              type="password"
              className="auth-input"
              name="password"
              placeholder="Password"
              required
            />
          )}
        </div>
        <button className="auth-submit-btn" type="submit">{props.formObj.buttonText}</button>
      </form>
      <div className="auth-form-section">
        {props.formObj.signUpLink && (
          <p>
            New User?
            <button className="link-button" id="btn_signUp" onClick={props.formObj.showSignUpForm} href="#">
              Create an account!
            </button>
          </p>
        )}
        {props.formObj.showLoginLink && (
          <p>
            Have an account?
            <button className="link-button" onClick={props.formObj.showLogInForm} href="#">
              Log in
            </button>
          </p>
        )}
        {props.formObj.forgotPasswordLink && (
          <p>
            <button className="link-button" onClick={props.formObj.showForgotPasswordForm} href="#">
              Forgot Password?
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
