// const input_username = document.getElementById("username");
// const input_email = document.getElementById("email");
// const input_password = document.getElementById("password");
const signUpForm = document.getElementById("signUpForm");
const signUpFormBox = document.getElementById("signUpFormBox");
const logInForm = document.getElementById("logInForm");
const logInFormBox = document.getElementById("logInFormBox");

const baseUrl = "http://localhost:3000/";
const signUpUrl = "http://localhost:3000/auth/signUp";
const logInUrl = "http://localhost:3000/auth/logIn";

let isLogInVisible = false;

function logInFormToggler(e) {
  isLogInVisible = !isLogInVisible;
  logInFormBox.style.display = isLogInVisible ? "block" : "none";
  signUpFormBox.style.display = isLogInVisible ? "none" : "block";
}

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const userData = {};
  for (const [name, value] of formData.entries()) userData[name] = value;
  try {
    const res = await axios.post(signUpUrl, userData);
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
  try {
    const res = await axios.post(logInUrl, userData);
    alert(res.statusText);
  } catch (err) {
    alert(err.response.statusText);
  }
});
