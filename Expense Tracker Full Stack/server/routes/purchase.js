const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order");
const userAuthentication = require("../middlewares/auth");

router.get("/premium", userAuthentication.authenticate ,orderController.purchasePremium);
router.post("/updateTransactionStatus", userAuthentication.authenticate ,orderController.updateTransactionStatus);

module.exports = router;
