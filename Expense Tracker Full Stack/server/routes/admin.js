const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/getSingleUser", adminController.getUserById);

router.get("/", adminController.getAllUsers);

router.post("/delete", adminController.deleteUser);

router.post("/edit", adminController.editUser);

router.post("/add", adminController.addUser);

module.exports = router;
