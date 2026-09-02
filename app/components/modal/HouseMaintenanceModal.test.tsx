import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import HouseMaintenanceModal from "./HouseMaintenanceModal";
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

describe("HouseMaintenanceModal", () => {
    test("Should submit House Maintenance bill", async () => {
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
                <HouseMaintenanceModal/>
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        });

        const houseMaintenanceCategory = screen.getByLabelText("Category:")
        const houseMaintenanceDescription = screen.getByLabelText("Description:")
        const houseMaintenanceAmount = screen.getByLabelText("Amount:")
        const houseMaintenancePaymentMethod = screen.getByRole("radio", { name: "Cash" })
        const houseMaintenanceDate = screen.getByLabelText("Date:")
        const houseMaintenanceNote = screen.getByPlaceholderText("Add notes...");

        await user.selectOptions(houseMaintenanceCategory, "Repairs")
        await user.type(houseMaintenanceDescription, "Plumbing repair")
        await user.type(houseMaintenanceAmount, "220")
        await user.click(houseMaintenancePaymentMethod)
        await user.type(houseMaintenanceDate, "2023-08-15")
        await user.type(houseMaintenanceNote, "Repair for leaking kitchen faucet")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
})