"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const title = req.body.title;
    const newTodo = new todo_1.Todo(Math.random().toString(), title);
    TODOS.push(newTodo);
};
exports.createTodo = createTodo;
