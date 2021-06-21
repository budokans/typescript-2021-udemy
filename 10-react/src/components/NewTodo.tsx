import React, { useState } from "react";

interface NewTodoProps {
  onAddTodo: (newTodoTitle: string) => void;
}

export const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const [inputtedTodoTitle, setInputtedTodoTitle] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(inputtedTodoTitle);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div>
        <label htmlFor="todo-title"></label>
        <input
          type="text"
          id="todo-title"
          onChange={({ target }) => setInputtedTodoTitle(target.value)}
          value={inputtedTodoTitle}
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};
