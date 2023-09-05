const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signUp", authController.createUser);

router.post("/logIn", authController.postUserLogin);

module.exports = router;
