import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

interface QueryParams {
  id: string;
}

const getId = (params: QueryParams) => {
  return params.id;
}

export const createTodo: RequestHandler = (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const newTodo = new Todo(Math.random().toString(), title);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Todo created", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<QueryParams> = (req, res, next) => {
  const id = getId(req.params);
  const newTitle = (req.body as { title: string }).title;

  const idx = TODOS.findIndex((todo) => id === todo.id);

  if (idx === -1) {
    throw new Error("Todo not found!");
  }

  TODOS[idx] = new Todo(id, newTitle);
  res.status(201).json({ message: "Todo updated!", updatedTodo: TODOS[idx] });
};

export const deleteTodo: RequestHandler<QueryParams> = (req, res, next) => {
  const id = getId(req.params);
  const idx = TODOS.findIndex((todo) => id === todo.id);

  if (idx === -1) {
    throw new Error("Todo not found!");
  }

  const deletedTodo = TODOS.splice(idx, 1);
  res.status(201).json({ message: "Todo deleted!", deletedTodo });
};
