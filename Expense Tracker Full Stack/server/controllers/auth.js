const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.generateAccessToken = (id, isPremium) => {
  return jwt.sign({ userID: id, isPremium }, process.env.SECRET_AUTH_KEY);
};

exports.createUser = async (req, res, next) => {
  const userdata = req.body;
  const username = userdata.username;
  const email = userdata.email;
  const password = userdata.password;
  /*bcrypt uses salt rounds for number of times randomizing our password and
     generates a hash password than can be checked using compare*/
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      if (err) throw new Error("Error while generating hash");
      else if (hash) {
        const newUser = await User.create({
          username,
          email,
          password: hash,
        });
        res.statusMessage = "User Registered and account created successfully";
        res.status(200).json(newUser);
      }
    } catch (err) {
      console.log("email esists error");
      res.statusMessage =
        "E-mail is already exists. Please LogIn or Use different E-mail";
      res.status(400).json(err);
    }
  });
};

exports.postUserLogin = async (req, res, next) => {
  const userdata = req.body;
  const email = userdata.email;
  const password = userdata.password;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    bcrypt.compare(password, user.password, (err, result) => {
      // result is boolean
      if (err) throw new Error("Error comparing passwrods in log in");
      if (!result) {
        res.statusMessage = "Wrong Password!!!";
        res.status(400).json(new Error());
      } else {
        res.statusMessage = "User Logged In successfully";
        res.status(200).json({
          token: this.generateAccessToken(user.id, user.isPremium),
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.statusMessage = "E-mail doesn't exists. Please check again!";
    res.status(400).json(err);
  }
};
