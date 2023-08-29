const express = require('express');
const router = express.Router();

router.get("/add-product", (req, res, next) => {
    res.send(
      '<form action="/admin/product" method="POST"><input name="title" type="text"><input name="size" type="number"><button type="submit">Send</button></form>'
    );
    res.redirect("/product");
  });
  
  router.post("/product",(req, res, next) => {
    console.log(req.body);
    res.send("<h1>Hello this is express JS</h1>");
  });

  module.exports = router;