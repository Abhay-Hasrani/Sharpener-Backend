const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/forgotPassword", authController.forgotPassword);

router.get(
  "/resetPassword/:forgotPasswordRequestID",
  authController.resetPassword
);
router.post(
  "/updatePassword",
  authController.updatePassword
);

module.exports = router;
