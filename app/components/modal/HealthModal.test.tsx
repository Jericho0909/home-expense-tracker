import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import HealthModal from "./HealthModal";
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

describe("HealthModal", () => {
    test("Should submit health bill", async () => {
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
                <HealthModal />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })


        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        });

        const healthCategory = screen.getByLabelText("Category:")
        const healthDescription = screen.getByLabelText("Description:")
        const healthAmount = screen.getByLabelText("Amount:")
        const healthPaymentMethod = screen.getByRole("radio", { name: "Cash" })
        const healthDate = screen.getByLabelText("Date:")
        const healthNote = screen.getByPlaceholderText("Add notes...")

        await user.selectOptions(healthCategory, "Medicine")
        await user.type(healthDescription, "Maintenance Medicine")
        await user.type(healthAmount, "150")
        await user.click(healthPaymentMethod)
        await user.type(healthDate, "2023-08-15")
        await user.type(healthNote, "Monthly maintenance medicine.")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})