import React from "react";
import { createGlobalStyle } from "styled-components";
import { TodoProvider } from "./context";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import {Container, MainContainer, Title} from "./ui-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f5efe6;
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <MainContainer>
        <Title>todos</Title>
        <Container>
          <AddTodo />
          <TodoList />
        </Container>
      </MainContainer>
    </TodoProvider>
  );
}

export default App;
