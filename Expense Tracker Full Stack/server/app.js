const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();
const bodyParser = require("body-parser");
const database = require("./db/database");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const User = require("./models/user");
const Expense = require("./models/expense");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ extended: false }));

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

database
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
