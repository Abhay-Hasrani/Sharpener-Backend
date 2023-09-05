const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  const userdata = req.body;
  const username = userdata.username;
  const email = userdata.email;
  const password = userdata.password;
  try {
    // console.log(userdata);
    const newUser = await User.create({ username, email, password });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
