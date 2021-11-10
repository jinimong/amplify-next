import React, { createContext, useContext, useReducer } from 'react';

type Todo = {
  id: string;
  name: string;
  description: string;
};

type TodoActionType =
  | { type: 'INITIALIZE'; todos: Todo[] }
  | { type: 'APPEND'; todo: Todo }
  | { type: 'DELETE'; id: string }
  | { type: 'UPDATE'; todo: Todo };

const reducer = (todos: Todo[], action: TodoActionType) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return [...action.todos];
    }
    case 'APPEND': {
      return [...todos, action.todo];
    }
    case 'DELETE': {
      return todos.filter(({ id }) => id !== action.id);
    }
    case 'UPDATE': {
      return todos.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo
      );
    }
  }
};

type TodoContextProps = {
  todos: Todo[];
  dispatch: React.Dispatch<TodoActionType>;
};

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  dispatch: () => {},
});

const TodoContextProvider: React.FC = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);

export default TodoContextProvider;
