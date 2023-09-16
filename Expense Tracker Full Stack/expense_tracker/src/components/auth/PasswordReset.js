import axios from "axios";
import myUrls from "../../utils/myUrls";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
const PasswordReset = () => {
  const navigate = useNavigate();
  async function resetPasswordHandler(e) {
    try {
      e.preventDefault();
      const arr = window.location.pathname.split("/");
      const forgotPasswordRequestID = arr.at(-1);
      console.log(forgotPasswordRequestID);
      const formData = new FormData(e.target);
      const userData = { forgotPasswordRequestID };
      for (const [name, value] of formData.entries()) userData[name] = value;
      if (userData.password !== userData.confirmPassword) {
        alert("Passwords Don't Match. Please Check again!!!");
      } else {
        const result = await axios.post(myUrls.updatePasswordUrl, userData);
        console.log(result.data);
        if (result.status === 201) {
          alert(result.data.message);
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  }
  return (
    <div className="auth-form-box" id="passwordResetFormBox">
      <form
        onSubmit={resetPasswordHandler}
        className="auth-form"
        id="passwordResetForm"
      >
        <span className="auth-title">Reset Your Password</span>
        <span className="auth-subtitle">
          Enter your password below and click Update.
        </span>
        <div className="auth-form-container">
          <input
            type="password"
            className="auth-input"
            id="new_password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="text"
            className="auth-input"
            id="confirm_new_password"
            name="confirmPassword"
            placeholder=" Confirm Password"
            required
          />
        </div>
        <button type="submit" className="auth-submit-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};
export default PasswordReset;
