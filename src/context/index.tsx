import React, { createContext, useReducer, useContext } from "react";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type Action =
    | { type: "ADD"; text: string }
    | { type: "TOGGLE"; id: string }
    | { type: "DELETE"; id: string }
    | { type: "CLEAR_COMPLETED" };

const TodoContext = createContext<{
    todos: Todo[];
    dispatch: React.Dispatch<Action>;
} | null>(null);

const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: Date.now().toString(), text: action.text, completed: false }];
        case "TOGGLE":
            return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
            );
        case "DELETE":
            return state.filter(todo => todo.id !== action.id);
        case "CLEAR_COMPLETED":
            return state.filter(todo => !todo.completed);
        default:
            return state;
    }
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, []);
    return <TodoContext.Provider value={{ todos, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodos must be used within a TodoProvider");
    return context;
};
