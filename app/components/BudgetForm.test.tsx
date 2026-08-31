import { render, screen, fireEvent } from "@testing-library/react";
import BudgetForm from "./BudgetForm";

describe("Budget Form", () => {
    test("Should render the Title", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByText("The Budget")).toBeInTheDocument()
    })

    test("Should have Utilities Budget label", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Utilities:")).toBeInTheDocument()
    })
})