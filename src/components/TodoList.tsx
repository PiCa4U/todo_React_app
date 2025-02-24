import React, { useState } from "react";
import { useTodos } from "../context";
import {Checkbox, FilterButtons, List, TodoItem} from "../ui-components";

const TodoList: React.FC = () => {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const textFix = (text: string) => {
    return text.length > 55 ? text.slice(0, 52) + "..." : text;
  };

  const unCompletedCount = todos.filter(todo => !todo.completed).length;

  return (
    <div>
      <List data-testid="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} completed={todo.completed ? "true" : undefined} data-testid={`todo-item-${todo.id}`}>
            <Checkbox
              checked={todo.completed}
              onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
              data-testid={`checkbox-${todo.id}`}
            />
            {textFix(todo.text)}
          </TodoItem>
        ))}
      </List>
      <FilterButtons>
        <div>{unCompletedCount} items left</div>
        <div style={{display: "flex",gap: 10}}>
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")} data-testid="filter-all">
            All
          </button>
          <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")} data-testid="filter-active" >
            Active
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")} data-testid="filter-completed">
            Completed
          </button>
        </div>
        <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })} data-testid="clear-completed">
          Clear completed
        </button>
      </FilterButtons>
    </div>
  );
};

export default TodoList;
