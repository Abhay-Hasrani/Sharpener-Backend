// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
//custom imports
// const routes = require('./routes');

const app = express();

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input name="title" type="text"><input name="size" type="number"><button type="submit">Send</button></form>'
  );
  res.redirect("/product");
});

app.post("/product",(req, res, next) => {
  console.log(req.body);
  res.send("<h1>Hello this is express JS</h1>");
});

// const server = http.createServer(routes.handler); //doesnt need this as app.listens does same bts
// server.listen(4000);
app.listen(4000);
