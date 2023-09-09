const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*imports for sib-api-v3-sdk api BREVO(previously SendInBlue)*/
const SIB = require("sib-api-v3-sdk");
const defaultClient = SIB.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API_KEY;
const apiInstance = new SIB.TransactionalEmailsApi();

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

exports.forgotPassword = async (req, res, next) => {
  try {
    const toEmail = req.body.email;
    const sender = {
      email: "abhayhasrani@gmail.com",
      name: "Abhay",
    };

    const receivers = [
      {
        email: toEmail,
      },
    ];

    const result = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Please click the below link to reset your password. Thank You!",
      textContent: `This is text content and i am {{params.anyVariable}}`,
      // htmlContent:`<h1>i am a h1 heading</h1>`, //html content overrides text content
      params: {
        anyVariable: "anyVariable",
      },
    });
    console.log(result);
    res.json({
      emailDetails: result,
      message: "Please Check your registered Email for the Link",
    });
  } catch (error) {
    console.log(err);
    res.status(402).json({ message: "Couldn't generate forgot password link" });
  }
};
