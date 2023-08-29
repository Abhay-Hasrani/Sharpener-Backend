// const http = require("http");

const express = require("express");

//custom imports
// const routes = require('./routes'); 

const app = express();

//using middlewares
app.use((req,res,next)=>{
    console.log("Middleware 1");
    next();
});

app.use((req,res,next)=>{
    console.log("Middleware 2");
    res.send("<h1>Hello this is express JS</h1>");
});

// const server = http.createServer(routes.handler); //doesnt need this as app.listens does same bts
// server.listen(4000);
app.listen(4000);
