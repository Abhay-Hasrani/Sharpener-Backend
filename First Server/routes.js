const fs = require("fs");
const requestHandler = (req, res) => {
  //   console.log("Abhay in the server");
  let text = "Welcome to my Node Js project";
  //   console.log(req.url);
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  if (req.url === "/home") text = "Welcome Home";
  if (req.url === "/about") text = "Welcome to About Us Page";
  if (url === "/") {
    const message = fs.readFileSync("message.txt");
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <body>
    <h1>${text}</h1>
    <h3>${message}</h3>
    <form action="/message" method="POST">
    <input type="text" name="message">
    <button type="submit">Send</button>
    </form>
    </body>
    </html>`);
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      const message = data.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        //   console.log(message);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

// First way to export
// module.exports = {
//   handler: requestHandler,
//   someOtherExport: "I am other Export",
// };

// Second way to export
// module.exports.handler = requestHandler;
// module.exports.someOtherExport = "I am other Export";

// third way to export
exports.handler = requestHandler;
exports.someOtherExport = "I am other Export";

