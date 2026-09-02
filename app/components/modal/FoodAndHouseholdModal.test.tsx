import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import FoodAndHouseholdModal from "./FoodAndHouseholdModal";
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

describe("FoodAndHouseholdModal", () => {
    test("Should submit food and household bill", async () => {
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
                <FoodAndHouseholdModal />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })
        
        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        })

        const foodHouseholdCategory = screen.getByLabelText("Category:")
        const foodHouseholdName = screen.getByLabelText("Name:")
        const foodHouseholdType = screen.getByLabelText("Type:")
        const foodHouseholdAmount = screen.getByLabelText("Amount:")
        const foodHouseholdPurchaseDate = screen.getByLabelText("Purchase Date:")
        const foodHouseholdNote = screen.getByPlaceholderText("Add notes...")

        await user.selectOptions(foodHouseholdCategory, "Groceries")
        await user.type(foodHouseholdName, "Milk")
        await user.type(foodHouseholdType, "Food")
        await user.type(foodHouseholdAmount, "5.99")
        await user.type(foodHouseholdPurchaseDate, "2023-08-15")
        await user.type(foodHouseholdNote, "Various grocery items for the household.")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})