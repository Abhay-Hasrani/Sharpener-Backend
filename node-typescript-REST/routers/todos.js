"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos });
});
router.post("/add-todo", (req, res, next) => {
    const newTodo = { id: new Date().toISOString(), text: req.body.text };
    //   res.status(200).json({ todos });
    console.log(newTodo);
    todos.push(newTodo);
    res.status(200).json({ newTodo });
});
router.post("/delete-todo", (req, res, next) => {
    const id = req.body.id;
    todos = todos.filter((item) => item.id !== id);
    res.status(200).json({ status: "Success", todos });
});
router.post("/edit-todo", (req, res, next) => {
    const id = req.body.id;
    const newText = req.body.text;
    const ind = todos.findIndex((item) => item.id === id);
    todos[ind].text = newText;
    res.status(200).json({ todos });
});
exports.default = router;
