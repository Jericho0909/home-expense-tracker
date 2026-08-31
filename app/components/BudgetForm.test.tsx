import { render, screen, fireEvent } from "@testing-library/react";
import BudgetForm from "./BudgetForm";

describe("Budget Form", () => {
    test("Should render the Title", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByText("The Budget")).toBeInTheDocument()
    })

    test("Should have Utilities Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Utilities:")).toBeInTheDocument()
        expect(screen.getByLabelText("Utilities:")).toHaveValue(null)
    })

    test("Should have Food And House Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Food and House:")).toBeInTheDocument()
        expect(screen.getByLabelText("Food and House:")).toHaveValue(null)
    })

    test("Should have Transportation Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Transportation:")).toBeInTheDocument()
        expect(screen.getByLabelText("Transportation:")).toHaveValue(null)
    })

    test("Should have Health Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Health:")).toBeInTheDocument()
        expect(screen.getByLabelText("Health:")).toHaveValue(null)
    })

    test("Should have House Maintenance Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("House Maintenance:")).toBeInTheDocument()
        expect(screen.getByLabelText("House Maintenance:")).toHaveValue(null)
    })

    test("Should have Family Expenses Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Family Expenses:")).toBeInTheDocument()
        expect(screen.getByLabelText("Family Expenses:")).toHaveValue(null)
    })

    test("Should have Other Expenses Budget label and input", () => {
        render(
            <BudgetForm/>
        )

        expect(screen.getByLabelText("Other Expenses:")).toBeInTheDocument()
        expect(screen.getByLabelText("Other Expenses:")).toHaveValue(null)
    })
})