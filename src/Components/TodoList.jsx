import { useTodos } from "../Context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const {
    state: { todos, loading },
  } = useTodos();

  if (loading) return <p className="text-center">Loading...</p>;

  if (todos.length === 0) return <p className="text-center">No tasks found.</p>;

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}