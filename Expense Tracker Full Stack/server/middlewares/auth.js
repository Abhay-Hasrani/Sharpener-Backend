const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("AuthenticationToken");
    const { userID } = jwt.verify(token, process.env.SECRET_AUTH_KEY);
    const user = await User.findById(userID);
    req.user = user;
    next();
  } catch (error) {
    res.statusMessage = "Error while authenticating token";
    res.status(401).json({ message: "Error while authenticating token" });
  }
};
