import {render, screen, fireEvent, waitFor, within} from "@testing-library/react";
import { TodoProvider } from "./context";
import App from "./App";

describe("Todo App", () => {
  it("adds a new todo", () => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("marks a todo as completed", async () => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const todoItem = await screen.findByText("New Task");
    // eslint-disable-next-line testing-library/no-node-access
    const todoId = todoItem.closest("li")?.getAttribute("data-testid")?.split("-").pop();
    expect(todoId).toBeDefined();

    const checkbox = screen.getByTestId(`checkbox-${todoId}`);
    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox).toBeChecked());
  });

  it("filters todos by active, completed, and all", async () => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    const todoItems = await screen.findAllByTestId(/todo-item-/);

    const checkboxes = todoItems.map(item =>
        within(item).getByTestId(`checkbox-${item.getAttribute('data-testid')?.split('-')[2]}`)
    );

    fireEvent.click(checkboxes[1]);

    const activeFilter = screen.getByTestId("filter-active");
    const completedFilter = screen.getByTestId("filter-completed");

    fireEvent.click(activeFilter);
    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();

    fireEvent.click(completedFilter);
    expect(screen.queryByText("Active Task")).not.toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();
  });

  it("clears completed todos", async () => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    const completedTodo = await screen.findByText("Completed Task");
    // eslint-disable-next-line testing-library/no-node-access
    const completedTodoId = completedTodo.closest("li")?.getAttribute("data-testid")?.split("-").pop();
    expect(completedTodoId).toBeDefined();

    const checkbox = screen.getByTestId(`checkbox-${completedTodoId}`);
    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox).toBeChecked());

    const clearButton = screen.getByTestId("clear-completed");
    fireEvent.click(clearButton);

    await waitFor(() => expect(screen.queryByText("Completed Task")).not.toBeInTheDocument());
  });
});
