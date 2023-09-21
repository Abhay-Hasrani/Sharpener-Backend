import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];

type RequestBody = { id: String; text: string };

router.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/add-todo", (req, res, next) => {
  const body = req.body as { text: string };
  const newTodo: Todo = { id: new Date().toISOString(), text: body.text };
  //   res.status(200).json({ todos });
  console.log(newTodo);
  todos.push(newTodo);
  res.status(200).json({ newTodo });
});

router.post("/delete-todo", (req, res, next) => {
  const body = req.body as { id: string };
  const id = body.id;
  todos = todos.filter((item) => item.id !== id);
  res.status(200).json({ status: "Success", todos });
});

router.post("/edit-todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const id = body.id;
  const newText = body.text;
  const ind = todos.findIndex((item) => item.id === id);
  todos[ind].text = newText;
  res.status(200).json({ todos });
});

export default router;
