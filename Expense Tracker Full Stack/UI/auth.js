// const input_username = document.getElementById("username");
// const input_email = document.getElementById("email");
// const input_password = document.getElementById("password");
const signUpForm = document.getElementById("signUpForm");
const logInForm = document.getElementById("logInForm");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const signUpFormBox = document.getElementById("signUpFormBox");
const logInFormBox = document.getElementById("logInFormBox");
const forgotPasswordFormBox = document.getElementById("forgotPasswordFormBox");

const baseUrl = "http://localhost:3000";

const authBaseUrl = baseUrl + "/auth";
const signUpUrl = authBaseUrl + "/signUp";
const logInUrl = authBaseUrl + "/logIn";

const passwordBaseUrl = baseUrl + "/password";
const forgotPasswordUrl = passwordBaseUrl + "/forgotPassword";

let isLogInVisible = true;

function showForm(formName) {
  isLogInVisible = !isLogInVisible;
  logInFormBox.style.display = "none";
  signUpFormBox.style.display = "none";
  forgotPasswordFormBox.style.display = "none";
  switch (formName) {
    case "sign_up":
      signUpFormBox.style.display = "block";
      break;
    case "forgot_password":
      forgotPasswordFormBox.style.display = "block";
      break;
    case "log_in":
      logInFormBox.style.display = "block";
      break;
  }
}

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const userData = {};
  for (const [name, value] of formData.entries()) userData[name] = value;
  try {
    const res = await axios.post(signUpUrl, userData);
    showForm("log_in");
    console.log(res);
  } catch (err) {
    alert(err.response.statusText);
  }
});

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const userData = {};
  for (const [name, value] of formData.entries()) userData[name] = value;
  // console.log(window.location);
  try {
    const res = await axios.post(logInUrl, userData);
    localStorage.setItem("token", res.data.token);
    console.log(res.statusText);
    // window.history.pushState({},"","./expenses.html");
    customRedirect();
  } catch (err) {
    console.log(err);
    alert(err.response.statusText);
  }
});

function customRedirect(isPremium) {
  // const encodedString = encodeURIComponent(isPremium);
  window.location.href = "./expenses.html";
}

forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(forgotPasswordForm);
  const userData = {};
  for (const [name, value] of formData.entries()) userData[name] = value;
  try {
    // console.log(userData);
    const res = await axios.post(forgotPasswordUrl, userData);
    showForm("log_in");
    console.log(res);
  } catch (err) {
    alert(err.response.statusText);
  }
});
