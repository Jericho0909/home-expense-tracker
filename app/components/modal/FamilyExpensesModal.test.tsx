import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import FamilyExpensesModal from "./FamilyExpensesModal";
import { ModalProvider } from "@/app/context/modalContext";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}))

const mockPush = jest.fn()
const mockBack = jest.fn()

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        back: mockBack,
    })
})

afterEach(() => {
    jest.useRealTimers()
})

describe("FamilyExpensesModal", () => {
    test("Should submit family expenses bill", async () => {
        global.fetch = jest.fn();

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
            }),
        })

        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        })

        render(
            <ModalProvider>
                <FamilyExpensesModal />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        });

        const familyExpensesCategory = screen.getByLabelText("Category:")
        const familyExpensesDescription = screen.getByLabelText("Description:")
        const familyExpensesAmount = screen.getByLabelText("Amount:")
        const familyExpensesPaymentMethod = screen.getByRole("radio", { name: "Cash" })
        const familyExpensesDate = screen.getByLabelText("Date:")
        const familyExpensesNotes = screen.getByPlaceholderText("Add notes...")

        await user.type(familyExpensesCategory, "Education")
        await user.type(familyExpensesDescription, "School Fees")
        await user.type(familyExpensesAmount, "5000")
        await user.click(familyExpensesPaymentMethod)
        await user.type(familyExpensesDate, "2023-06-01")
        await user.type(familyExpensesNotes, "Paid in full")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})