import React, { useState } from "react";
import { useTodos } from "../context";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  padding: 10px;
  border-bottom: 1px solid #ededed;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 24px;
  padding: 10px;
  outline: none;
  font-style: italic;
  color: #999;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #bbb;
  visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
  &:hover {
    color: #888;
  }
`;

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
      />
      <Button type="submit" disabled={!text.trim()}>
        +
      </Button>
    </Form>
  );
};

export default AddTodo;
