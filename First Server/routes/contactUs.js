const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require("../util/path");

router.get("/", (req, res, next) => {
    // res.send(
    //   '<form action="/admin/product" method="POST"><input name="title" type="text"><input name="size" type="number"><button type="submit">Send</button></form>'
    // );
    res.sendFile(path.join(rootDir,"views","contact-us.html"));
  });

router.post("/", (req, res, next) => {
    
    res.redirect("/contact-us/success");
  }); 
router.get("/success", (req, res, next) => {
    res.sendFile(path.join(rootDir,"views","success.html"));
  }); 
  


  module.exports = router;