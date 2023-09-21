import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/add-todo", (req, res, next) => {
  const newTodo: Todo = { id: new Date().toISOString(), text: req.body.text };
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

export default router;
