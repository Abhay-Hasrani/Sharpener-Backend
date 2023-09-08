const express = require("express");

const userAuthentication = require("../middlewares/auth");
const premiumController = require("../controllers/premium");

const router = express.Router();

router.get("/leaderboard",userAuthentication.authenticate,premiumController.getLeaderBoard);

module.exports = router;