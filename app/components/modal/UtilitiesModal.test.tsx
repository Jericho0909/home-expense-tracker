
import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import UtilitiesModal from "./UtilitiesModal";
import { ModalProvider } from "@/app/context/modalContext";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockBack = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        back: mockBack,
    });
});

afterEach(() => {
    jest.useRealTimers();
});

describe("UtilitiesModal", () => {
    test("Should submit utility bill", async () => {
        global.fetch = jest.fn();

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
            }),
        });

        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        render(
            <ModalProvider>
                <UtilitiesModal />
            </ModalProvider>
        );

        act(() => {
            jest.advanceTimersByTime(2500);
        });

        screen.debug();

        const submitButton = screen.getByRole("button", {
            name: "Save Bill",
        });

        const utilitiesName = screen.getByLabelText("Utility:");
        const utilitiesStatus = screen.getByLabelText("Status:");
        const utilitiesAmount = screen.getByLabelText("Amount:");
        const utilitiesBillingStart = screen.getByLabelText("Billing Start:");
        const utilitiesBillingEnd = screen.getByLabelText("Billing End:");
        const utilitiesDueDate = screen.getByLabelText("Due Date:");
        const utilitiesNotes = screen.getByPlaceholderText("Add notes...");

        await user.selectOptions(utilitiesName, "Electricity");
        await user.selectOptions(utilitiesStatus, "Paid");
        await user.type(utilitiesAmount, "3250");
        await user.type(utilitiesBillingStart, "2026-07-01");
        await user.type(utilitiesBillingEnd, "2026-07-31");
        await user.type(utilitiesDueDate, "2026-07-15");
        await user.type(
            utilitiesNotes,
            "Paid before the due date."
        );

        await user.click(submitButton);

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    });
});
