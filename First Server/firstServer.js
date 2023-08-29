const http = require("http");

//custom imports
const routes = require('./routes'); 

const server = http.createServer(routes.handler);
server.listen(4000); 
  