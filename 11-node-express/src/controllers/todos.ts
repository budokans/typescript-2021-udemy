import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const newTodo = new Todo(Math.random().toString(), title);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Todo created", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const newTitle = (req.body as { title: string }).title;

  const idx = TODOS.findIndex((todo) => id === todo.id);

  if (idx === -1) {
    throw new Error("Todo not found!");
  }

  TODOS[idx] = new Todo(id, newTitle);
  res.status(201).json({ message: "Todo updated!", updatedTodo: TODOS[idx] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const idx = TODOS.findIndex((todo) => id === todo.id);

  if (idx === -1) {
    throw new Error("Todo not found!");
  }

  const deletedTodo = TODOS.splice(idx, 1);
  res.status(201).json({ message: "Todo deleted!", deletedTodo });
};
