// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
//custom imports
// const routes = require('./routes');
const admin = require('./routes/admin.js');

const app = express();

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin',admin);


// const server = http.createServer(routes.handler); //doesnt need this as app.listens does same bts
// server.listen(4000);
app.listen(4000);
