const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const ForgotPassword = require("../models/forgotPassword");

/*imports for sib-api-v3-sdk api BREVO(previously SendInBlue)*/
const SIB = require("sib-api-v3-sdk");
const database = require("../db/database");
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
  const transaction = await database.transaction();
  try {
    const toEmail = req.body.email;
    const user = await User.findOne({
      where: {
        email: toEmail,
      },
      transaction,
    });

    const forgotPasswordRequest = await user.createForgotPasswordRequest(
      {
        id: uuidv4(),
        isActive: true,
      },
      { transaction }
    );
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
      htmlContent: `<h3>Click Below Link To reset your password</h3>
      <a href="http://localhost:4000/password/resetPassword/${forgotPasswordRequest.id}">Reset</a>`, //html content overrides text content
      // textContent: `This is text content and i am {{params.anyVariable}}`,
      // params: {
      //   anyVariable: "anyVariable",
      // },
    });
    // console.log(result);
    res.json({
      emailDetails: result,
      message: "Please Check your registered Email for the Link",
    });

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    res.status(402).json({ message: "Couldn't generate forgot password link" });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const forgotPasswordRequestID = req.params.forgotPasswordRequestID;
    const isRequestValid = await ForgotPassword.findByPk(
      forgotPasswordRequestID
    );
    // console.log(" validatitiy: ", isRequestValid);
    if (isRequestValid && isRequestValid.isActive) {
      //below linedoesnt work due to security reasons so need to use sendFile
      // res.redirect("file:///c%3A/Users/91983/SharpenerBackEnd/Expense%20Tracker%20Full%20Stack/UI/passwordReset.html");
      res.redirect("http://localhost:3000/resetPassword/"+forgotPasswordRequestID);
      // res.sendFile(
      //   path.join(__dirname, "..", "..", "UI", "passwordReset.html"),
      //   path.join(__dirname, "..", "..", "styles", "auth.css")
      // );
    } else throw new Error("Request Link has Expired");
  } catch (err) {
    console.log(err);
    res.status(401).json(err.message);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const forgotPasswordRequestID = req.body.forgotPasswordRequestID;
    const newPassword = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
      if (err) throw new Error("Error while generating hash");
      else if (hash) {
        const forgotPassword = await ForgotPassword.findByPk(
          forgotPasswordRequestID
        );
        const updateForgotPasswordActive = await forgotPassword.update({
          isActive: "false",
        });
        const userWithUpdatedPassword = await User.update(
          { password: hash },
          { where: { id: forgotPassword.userId } }
        );
        console.log(
          "here",
          forgotPassword,"......... ", 
          updateForgotPasswordActive,"......... ",
          userWithUpdatedPassword
        );
        res.statusMessage = "User password changed successfully";
        res.status(201).json({message:"User password changed successfully"});
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).json(err.message);
  }
};
