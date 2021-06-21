import React, { useState } from "react";
import "./NewTodo.css";

interface NewTodoProps {
  onAddTodo: (newTodoTitle: string) => void;
}

export const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const [inputtedTodoTitle, setInputtedTodoTitle] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(inputtedTodoTitle);
    setInputtedTodoTitle("");
  };

  return (
    <form className="form-control" onSubmit={handleAddTodo}>
      <div>
        <label htmlFor="todo-title">What needs doing?</label>
        <input
          type="text"
          id="todo-title"
          placeholder="e.g. File taxes"
          onChange={({ target }) => setInputtedTodoTitle(target.value)}
          value={inputtedTodoTitle}
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};
