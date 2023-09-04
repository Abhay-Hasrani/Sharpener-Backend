const express = require("express");

const stockController = require("../controllers/stock");

const router = express.Router();

router.get("/",stockController.getAllProducts);

router.post("/add", stockController.addProducts);

router.post("/edit/:productID", stockController.editProductQuantity);

router.delete("/delete/:productID", stockController.deleteProducts);

module.exports = router;
