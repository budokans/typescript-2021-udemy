"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const title = req.body.title;
    const newTodo = new todo_1.Todo(Math.random().toString(), title);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Todo created", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const idx = TODOS.findIndex((todo) => id === todo.id);
    if (idx === -1) {
        throw new Error("Todo not found!");
    }
    TODOS[idx] = new todo_1.Todo(id, newTitle);
    res.status(201).json({ message: "Todo updated!", updatedTodo: TODOS[idx] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const idx = TODOS.findIndex((todo) => id === todo.id);
    if (idx === -1) {
        throw new Error("Todo not found!");
    }
    const deletedTodo = TODOS.splice(idx, 1);
    res.status(201).json({ message: "Todo deleted!", deletedTodo });
};
exports.deleteTodo = deleteTodo;
