import React from "react";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const todos = [{ id: 1, title: "Finish this goddamn course" }];

  return (
    <div className="App">
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
