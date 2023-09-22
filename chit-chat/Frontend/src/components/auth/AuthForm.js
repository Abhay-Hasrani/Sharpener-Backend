import "./AuthForm.css";
const AuthForm = () => {
  return (
    <div className="auth-form-container">
      <form className="auth-form" action="">
        <p className="auth-form-title">Sign Up</p>
        <input placeholder="Name" className="auth-input" type="text" required/>
        <input placeholder="E-mail" className="auth-input" type="email" required/>
        <input placeholder="Mobile Number" className="auth-input" type="number" required/>
        <input placeholder="Password" className="auth-input" type="password" required/>
        <button className="auth-btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default AuthForm;
