import React from "react";
import { authLogInUrl, authSignUpUrl } from "../../utils/myUrls";
import AuthForm from "./AuthForm";
import axios from "axios";
import { useState } from "react";

const Auth = (props) => {
  const [toggleLogIn, setToggleLogIn] = useState(true);
  const signUpFormProps = {
    title: "Sign Up",
  };
  const logInFormProps = {
    title: "Log In",
  };

  async function signUpHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      const result = await axios.post(authSignUpUrl, userData);
      console.log(result.data);
      setToggleLogIn(!toggleLogIn);
    } catch (error) {
      console.log(error);
      alert(error.response.statusText);
    }
  }
  async function logInHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      const result = await axios.post(authLogInUrl, userData);
      props.onLogInClicked(result.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  }
  return (
    <>
      {toggleLogIn ? (
        <AuthForm
          {...logInFormProps}
          onSubmit={logInHandler}
          toggleLogIn={toggleLogIn}
          setToggleLogIn={() => setToggleLogIn(!toggleLogIn)}
        />
      ) : (
        <AuthForm
          {...signUpFormProps}
          onSubmit={signUpHandler}
          toggleLogIn={toggleLogIn}
          setToggleLogIn={() => setToggleLogIn(!toggleLogIn)}
        />
      )}
    </>
  );
};
export default Auth;
