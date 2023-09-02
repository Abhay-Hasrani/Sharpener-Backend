const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const sequelize = require("./util/database");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
