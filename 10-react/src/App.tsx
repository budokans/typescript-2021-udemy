import React, { useState } from "react";
import { Todo } from "./todo.model";
import { NewTodo } from "./components/NewTodo";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodoTitle: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), title: newTodoTitle },
    ]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodo} />
      <TodoList todos={todos} onDeleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
