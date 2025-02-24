import { render, screen, fireEvent } from "@testing-library/react";
import { TodoProvider } from "../context";
import AddTodo from "../components/AddTodo";

test("добавление новой задачи", () => {
    render(
        <TodoProvider>
            <AddTodo />
        </TodoProvider>
    );

    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(button);

    expect(input).toHaveValue("");
});
