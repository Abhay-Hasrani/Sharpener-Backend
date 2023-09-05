const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  const userdata = req.body;
  const username = userdata.username;
  const email = userdata.email;
  const password = userdata.password;
  try {
    // console.log(userdata);
    const newUser = await User.create({ username, email, password });
    res.statusMessage = "User Registered and account created successfully";
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.statusMessage =
      "E-mail is already exists. Please LogIn or Use different E-mail";
    res.status(400).json(err);
  }
};

exports.postUserLogin = async (req, res, next) => {
  const userdata = req.body;
  const email = userdata.email;
  const password = userdata.password;
  try {
    // console.log(userdata);
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user.password != password) {
      res.statusMessage = "Wrong Password!!!";
      res.status(400).json(new Error());
    } else {
      res.statusMessage = "User Logged In successfully";
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.statusMessage = "E-mail doesn't exists. Please check again!";
    res.status(400).json(err);
  }
};
