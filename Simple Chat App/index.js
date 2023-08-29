const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  res.send(
    '<html><body><form method="POST" action="/" onsubmit="formsubmit()"><input id="username" type="text" name="username" /><button type="submit">set</button></form></body><script>function formsubmit() {localStorage.setItem("username",document.getElementById("username").value);return true;}</script></html>'
  );
});

app.post("/", (req, res, next) => {
    // console.log(req.body.username);
    const message = req.body.message;
    let filedata = "No chat Exists";
    if(message) fs.appendFileSync("chats.txt",message);
    const chats = fs.readFileSync("chats.txt");
    
    if(chats) filedata=chats;
    console.log(req.body);
    res.send(
        '<html><body><h1>Chat App</h1><h3>'+filedata+'</h3><form method="POST" action="/" onsubmit="formsubmit()"><input placeholder="message" id="message" type="text" name="message" /><button type="submit">send</button></form></body><script>function formsubmit() {const message = document.getElementById("message"); const messagevalue= message.value;message.value = localStorage.getItem("username")+" : "+messagevalue+" "; return true;}</script></html>'
      );
});

app.listen(4000);
