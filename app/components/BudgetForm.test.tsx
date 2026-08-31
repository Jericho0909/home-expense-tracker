import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
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

    test("Test handle handleSubmit", async () => {
        global.fetch = jest.fn();

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
            }),
        });

        const user = userEvent.setup()

        render(
            <BudgetForm/>
        )

        const submitButton = screen.getByRole("button", {
            name: "Save Budget",
        });

        const utilitiesBudget = screen.getByLabelText("Utilities:")
        const foodAndHouseBudget = screen.getByLabelText("Food and House:")
        const transportationBudget = screen.getByLabelText("Transportation:")
        const healthBudget = screen.getByLabelText("Health:")
        const houseMaintenance = screen.getByLabelText("House Maintenance:")
        const familyExpenses = screen.getByLabelText("Family Expenses:")
        const otherExpenses = screen.getByLabelText("Other Expenses:")
        await user.type(utilitiesBudget, "1500")
        await user.type(foodAndHouseBudget, "1500")
        await user.type(transportationBudget, "1500")
        await user.type(healthBudget, "1500")
        await user.type(houseMaintenance, "1500")
        await user.type(familyExpenses, "1500")
        await user.type(otherExpenses, "1500");
        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/budget",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})