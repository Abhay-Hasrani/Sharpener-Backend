const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();
const bodyParser = require("body-parser");
const database = require("./db/database");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const passwordRoutes = require("./routes/password");

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");
const ForgotPassword = require("./models/forgotPassword");
const FilesDownloaded = require("./models/filesDownloaded");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ extended: false }));

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", passwordRoutes);
 
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

database
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
