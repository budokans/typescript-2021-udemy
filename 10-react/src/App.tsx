import React, { useState } from "react";
import { NewTodo } from "./components/NewTodo";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Finish this goddamn course" },
  ]);

  const addTodo = (newTodoTitle: string) => {
    setTodos([...todos, { id: todos.length + 1, title: newTodoTitle }]);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
