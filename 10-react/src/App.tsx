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

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
