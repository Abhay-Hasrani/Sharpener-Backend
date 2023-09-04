const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const database = require("./util/database");
const stockRoutes = require("./routes/stock");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/stock", stockRoutes);

database
  .sync({ alter: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
