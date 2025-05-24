import { useState } from "react";
import { useTodos } from "../Context/TodoContext";

export default function TodoItem({ todo }) {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: editText } });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="flex justify-between items-center border-b py-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
          className="w-4 h-4"
        />
        {isEditing ? (
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <span className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="px-2 py-1 bg-yellow-400 text-white rounded"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}