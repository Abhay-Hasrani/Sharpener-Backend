const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Abhay in the server");
});
server.listen(4000);
