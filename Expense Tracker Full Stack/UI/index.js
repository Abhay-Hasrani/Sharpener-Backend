const input_username = document.getElementById("username");
const input_email = document.getElementById("email");
const input_password = document.getElementById("password");
const signUpForm = document.getElementById("myForm");

const baseUrl = "http://localhost:3000/";
const signUpUrl = "http://localhost:3000/auth/signUp";

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const userData = {};
  for (const [name, value] of formData.entries()) userData[name] = value;
  try {
    const newUser = await axios.post(signUpUrl, userData);
    console.log(newUser);
  } catch (err) {
    alert(err.response.data.original.sqlMessage);
  }
});
