import { createContext, useContext, useReducer, useEffect } from "react";

const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: true,
};

function todoReducer(state, action) {
     let updatedTodos;
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload, loading: false };
    case "ADD_TODO":
      updatedTodos = [action.payload, ...state.todos];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    case "DELETE_TODO":
      updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    case "TOGGLE_TODO":
      updatedTodos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    case "EDIT_TODO":
      updatedTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
      case "CLEAR_TODOS":
      localStorage.removeItem("todos");
      return { ...state, todos: [] };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(localTodos) });
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(todo => ({
            id: todo.id,
            text: todo.title,
            completed: todo.completed,
          }));
          localStorage.setItem("todos", JSON.stringify(formatted));
          dispatch({ type: "SET_TODOS", payload: formatted });
        });
    }
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);