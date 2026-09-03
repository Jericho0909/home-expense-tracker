import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import FoodAndHouseholdPayModal from "./FoodAndHouseholdPayModal";
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

describe("FoodAndHouseholdPayModal", () => {
    test("Should submit food and household bill payment", async () => {
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
                <FoodAndHouseholdPayModal id="10" />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Mark as Paid",
        })

        const foodAndHouseholdPaymentMethod = screen.getByRole("radio", {
            name: "Cash",
        })

        await user.click(foodAndHouseholdPaymentMethod)
        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/foodandhousehold/10",
            expect.objectContaining({
                method: "PUT",
            })
        )
    })
})