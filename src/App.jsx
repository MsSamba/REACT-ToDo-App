import { TodoProvider } from "./Context/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

export default function App() {
  return (
   <>
    <TodoProvider>
      <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
   </>
  );
}