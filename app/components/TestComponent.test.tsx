import { render, screen } from "@testing-library/react";
import TestComponent from "./TestComponent";

test("renders title", () => {
  render(<TestComponent />);

  const title = screen.getByText(
    "Zara Family Expenses"
  );

  expect(title).toBeInTheDocument();
});