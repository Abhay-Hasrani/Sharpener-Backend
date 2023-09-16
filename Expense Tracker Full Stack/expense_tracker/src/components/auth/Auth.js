import { useState } from "react";
import AuthForm from "./AuthForm";
import axios from "axios";
import myUrls from "../../utils/myUrls";

const Auth = (props) => {
  const [formState, setFromState] = useState("log_in");

  //below form object is form log_in state
  let formObj = {
    title: "Log In",
    subtitle: "Log In with your email and password",
    showUserName: false,
    showEmail: true,
    showPassword: true,
    showLoginLink: false,
    signUpLink: true,
    forgotPasswordLink: true,
    buttonText: "Log In",
    onSubmit: logInHandler,
  };
  switch (formState) {
    case "sign_up": {
      formObj = {
        title: "Sign Up",
        subtitle: "Create a free account with your email.",
        showUserName: true,
        showEmail: true,
        showPassword: true,
        showLoginLink: true,
        signUpLink: false,
        forgotPasswordLink: true,
        buttonText: "Sign Up",
        onSubmit: singUpHandler,
      };
      break;
    }
    case "forgot_password": {
      formObj = {
        title: "Forgot Password?",
        subtitle: "Generate a link on your registered email.",
        showUserName: false,
        showEmail: true,
        showPassword: false,
        showLoginLink: true,
        signUpLink: true,
        forgotPasswordLink: false,
        buttonText: "Send Mail",
        onSubmit: forgotPasswordHandler,
      };
      break;
    }
    default: {
      console.log("Showing Log In Form");
    }
  }

  formObj.showLogInForm = () => {
    setFromState("log_in");
  };
  formObj.showSignUpForm = () => {
    setFromState("sign_up");
  };
  formObj.showForgotPasswordForm = () => {
    setFromState("forgot_password");
  };

  async function logInHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    // console.log(window.location);
    try {
      const res = await axios.post(myUrls.logInUrl, userData);
      localStorage.setItem("token", res.data.token);
      console.log(res.statusText);
      // window.history.pushState({},"","./expenses.html");
      //   customRedirect();
      props.onLogInClicked();
      console.log("logged in");
    } catch (err) {
      console.log(err);
      alert(err.response.statusText);
    }
  }
  async function singUpHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      const res = await axios.post(myUrls.signUpUrl, userData);
      formObj.showLogInForm();
      console.log(res);
    } catch (err) {
      alert(err.response.statusText);
    }
  }
  async function forgotPasswordHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      // console.log(userData);
      const res = await axios.post(myUrls.forgotPasswordUrl, userData);
      // formObj.showLogInForm();
      alert("Check Your Mail Box");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return <AuthForm formObj={formObj} />;
};

export default Auth;
