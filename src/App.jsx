import { AuthProvider, useAuth } from "./Context/AuthContext";
import { TodoProvider } from "./Context/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import Login from "./Components/Login";

function TodoApp() {
  const { user, logout } = useAuth();

  return (
    <TodoProvider>
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-center w-full">To-Do List</h1>
            {user && (
              <button
                onClick={logout}
                className="ml-auto bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            )}
          </div>
          {user ? (
            <>
              <TodoForm />
              <TodoList />
            </>
          ) : (
            <Login />
          )}
        </div>
    </TodoProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
}
