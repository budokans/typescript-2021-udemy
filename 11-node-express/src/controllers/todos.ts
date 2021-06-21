import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const newTodo = new Todo(Math.random().toString(), title);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Todo created", createdTodo: newTodo });
};
