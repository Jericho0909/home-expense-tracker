import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import ContributionBudgetModal from "./ContributionBudgetModal";
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

describe("ContributionBudgetModal", () => {
    test("Should submit contribution budget", async () => {
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
                <ContributionBudgetModal id="1" />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Add Money",
        });

        const addMoneyInput = screen.getByLabelText("Add Money:")

        await user.type(addMoneyInput, "1000")
        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/members/1",
            expect.objectContaining({
                method: "PUT",
            })
        )
        
    })
})