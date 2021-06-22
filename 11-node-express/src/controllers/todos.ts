import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

interface QueryParams {
  id: string;
}

interface RequestBody {
  title: string;
}

const getId = (params: QueryParams) => {
  return params.id;
}

const getTodoIdx = (id: string) => {
  return TODOS.findIndex(todo => id === todo.id);
}

const getTitle = (reqBody: RequestBody) => {
  return reqBody.title;
}

export const createTodo: RequestHandler = (req, res, next) => {
  const title = getTitle(req.body);
  const newTodo = new Todo(Math.random().toString(), title);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Todo created", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<QueryParams> = (req, res, next) => {
  const id = getId(req.params);
  const todoIdx = getTodoIdx(id);

  if (todoIdx === -1) {
    throw new Error("Todo not found!");
  }

  const newTitle = getTitle(req.body);

  TODOS[todoIdx] = new Todo(id, newTitle);
  res.status(201).json({ message: "Todo updated!", updatedTodo: TODOS[todoIdx] });
};

export const deleteTodo: RequestHandler<QueryParams> = (req, res, next) => {
  const id = getId(req.params);
  const todoIdx = getTodoIdx(id);

  if (todoIdx === -1) {
    throw new Error("Todo not found!");
  }

  const deletedTodo = TODOS.splice(todoIdx, 1);
  res.status(201).json({ message: "Todo deleted!", deletedTodo });
};