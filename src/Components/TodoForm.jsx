import { useState } from "react";
import { useTodos } from "../Context/TodoContext";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { dispatch } = useTodos();

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    setText("");
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      dispatch({ type: "CLEAR_TODOS" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg"
        placeholder="Add new task"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Add
      </button>

       <button
        type="button"
        onClick={handleClear}
        className="px-4 py-2 bg-red-400 text-white rounded-lg"
      >
        Clear All
      </button>
    </form>
  );
}