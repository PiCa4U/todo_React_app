import styled from "styled-components";

export const FilterButtons = styled.div`
  display: flex;
  padding: 10px 20px 20px 20px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    background: #ddd;
    border-radius: 5px;

    &.active {
      background: #888;
      color: white;
    }
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
`;

export const TodoItem = styled.li<{ completed: string | undefined }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-bottom: 1px solid #ededed;
  font-size: 18px;
  color: ${({ completed }) => (completed ? "#d9d9d9" : "#4d4d4d")};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  opacity: ${({ completed }) => (completed ? 0.9 : 1)};
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:checked {
    border-color: #5dc2af;
    background-color: #5dc2af;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l3 3 6-6' stroke='%23fff' stroke-width='2' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const MainContainer = styled.div`
  background: #f5efe6;
  padding: 30px;
  width: 600px;
  text-align: center;
`;

export const Container = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 600px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: lighter;
  color: rgba(200, 150, 150, 0.3);
  text-transform: lowercase;
  margin-bottom: 20px;
`;
