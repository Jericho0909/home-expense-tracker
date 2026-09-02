import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import TransportationModal from "./TransportationModal";
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

describe("TransportationModal", () => {
    test("Should submit transportation bill", async () => {
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
                <TransportationModal />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        });

        const transportationCategory = screen.getByLabelText("Category:")
        const transportationDescription = screen.getByLabelText("Description:")
        const transportationAmount = screen.getByLabelText("Amount:")
        const transportationPaymentMethod = screen.getByRole("radio", { name: "Cash" })
        const transportationDate = screen.getByLabelText("Date:")
        const transportationNote = screen.getByPlaceholderText("Add notes...");

        await user.selectOptions(transportationCategory, "Fuel")
        await user.type(transportationDescription, "Gasoline")
        await user.type(transportationAmount, "250")
        await user.click(transportationPaymentMethod)
        await user.type(transportationDate, "2023-08-15")
        await user.type(transportationNote, "Full tank refill.")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})