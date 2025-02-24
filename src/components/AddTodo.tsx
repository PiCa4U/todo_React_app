import React, { useState } from "react";
import { useTodos } from "../context";
import {Button, Form, Input} from "../ui-components";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const { dispatch } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD", text });
      setText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        data-testid="todo-input"
      />
      <Button type="submit" disabled={!text.trim()} data-testid="add-todo-button">
        +
      </Button>
    </Form>
  );
};

export default AddTodo;
