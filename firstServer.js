const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Abhay in the server");
  let text="Welcome to my Node Js project";
  console.log(req.url);
  if(req.url==="/home") text="Welcome Home";
  if(req.url==="/about") text="Welcome to About Us Page";
  res.setHeader('Content-Type','text/html');
  res.write(`<html><body><h1>${text}</title></h1></html>`);
  res.end();
});
server.listen(4000);
