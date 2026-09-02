import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import OtherExpensesModal from "./OtherExpensesModal";
import { ModalProvider } from "@/app/context/modalContext";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

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

describe("OtherExpensesModal", () => {
    test("Should submit other expenses bill", async () => {
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
                <OtherExpensesModal />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        })

        const otherExpensesCategory = screen.getByLabelText("Category:")
        const otherExpensesDescription = screen.getByLabelText("Description:")
        const otherExpensesAmount = screen.getByLabelText("Amount:")
        const otherExpensesPaymentMethod = screen.getByRole("radio", { name: "Cash" })
        const otherExpensesDate = screen.getByLabelText("Date:")
        const otherExpensesNote = screen.getByPlaceholderText("Add notes...");

        await user.selectOptions(otherExpensesCategory, "Miscellaneous")
        await user.type(otherExpensesDescription, "Office supplies")
        await user.type(otherExpensesAmount, "100")
        await user.click(otherExpensesPaymentMethod)
        await user.type(otherExpensesDate, "2023-08-15")
        await user.type(otherExpensesNote, "Purchased pens and notebooks.")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})