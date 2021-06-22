"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const getId = (params) => {
    return params.id;
};
const getTodoIdx = (id) => {
    return TODOS.findIndex(todo => id === todo.id);
};
const getTitle = (reqBody) => {
    return reqBody.title;
};
const createTodo = (req, res, next) => {
    const title = getTitle(req.body);
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
    const id = getId(req.params);
    const todoIdx = getTodoIdx(id);
    if (todoIdx === -1) {
        throw new Error("Todo not found!");
    }
    const newTitle = getTitle(req.body);
    TODOS[todoIdx] = new todo_1.Todo(id, newTitle);
    res.status(201).json({ message: "Todo updated!", updatedTodo: TODOS[todoIdx] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const id = getId(req.params);
    const todoIdx = getTodoIdx(id);
    if (todoIdx === -1) {
        throw new Error("Todo not found!");
    }
    const deletedTodo = TODOS.splice(todoIdx, 1);
    res.status(201).json({ message: "Todo deleted!", deletedTodo });
};
exports.deleteTodo = deleteTodo;
