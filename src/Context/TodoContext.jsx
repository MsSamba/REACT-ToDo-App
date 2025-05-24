import { createContext, useContext, useReducer, useEffect } from "react";

const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: true,
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload, loading: false };
    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(todo => ({
          id: todo.id,
          text: todo.title,
          completed: todo.completed,
        }));
        dispatch({ type: "SET_TODOS", payload: formatted });
      });
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);