import "./AuthForm.css";
const AuthForm = (props) => {
  const toggleLogIn = props.toggleLogIn;
  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={props.onSubmit}>
        <p className="auth-form-title">{props.title}</p>
        {!toggleLogIn && (
          <input
            placeholder="Name"
            className="auth-input"
            type="text"
            name="username"
            required
          />
        )}
        <input
          placeholder="E-mail"
          className="auth-input"
          type="email"
          name="email"
          required
        />
        {!toggleLogIn && (
          <input
            placeholder="Mobile Number"
            className="auth-input"
            type="number"
            name="mob_number"
            required
          />
        )}
        <input
          placeholder="Password"
          className="auth-input"
          type="password"
          name="password"
          required
        />
        <button className="auth-btn" type="submit">
          {props.title}
        </button>
        <button
          className="link-button"
          id="btn_signUp"
          onClick={props.setToggleLogIn}
          href="#"
        >
          {toggleLogIn?"New user? Create an account!":"Already a User? Log In!"}
        </button>
      </form>
    </div>
  );
};
export default AuthForm;
