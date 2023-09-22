import { authSignUpUrl } from "../../utils/myUrls";
import AuthForm from "./AuthForm";
import axios from "axios";

const Auth = () => {
  const signUpFormProps = {
    title: "Sign Up",
  };

  async function signUpHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      const result = await axios.post(authSignUpUrl, userData);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      alert(error.response.statusText);
    }
  }
  return <AuthForm {...signUpFormProps} onSubmit={signUpHandler} />;
};
export default Auth;
