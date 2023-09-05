const User = require("../models/user");

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

exports.getUserById = (req, res, next) => {
  const id = req.query.id;
  User.findByPk(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  const id = req.body.id;
  User.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.json();
      console.log("Expense Deleted");
    })
    .catch((err) => console.log(err));
};

exports.editUser = (req, res, next) => {
  const id = req.body.id;
  const amount = req.body.amount;
  const activity = req.body.activity;
  const category = req.body.category;
  const expense = { id, amount, activity, category };
  User.findByPk(id)
    .then((expense) => {
      expense.amount = amount;
      expense.activity = activity;
      expense.category = category;
      return expense.save();
    })
    .then(() => {
      res.json(expense);
      console.log("Expense edited");
    })
    .catch((err) => console.log(err));
};

exports.addUser = (req, res, next) => {
  const amount = req.body.amount;
  const activity = req.body.activity;
  const category = req.body.category;
  User.create({ amount, activity, category })
    .then((expense) => {
      res.json(expense);
      console.log("Expense added");
    })
    .catch((err) => console.log(err));
};
