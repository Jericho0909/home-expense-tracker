import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import AddMemberModal from "./AddMemberModal";
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

describe("AddMemberModal", () => {
    test("Should submit add member form", async () => {
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
                <AddMemberModal />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Add Member",
        });

        const memberName = screen.getByLabelText("Name:")
        const memberCategory = screen.getByLabelText("Category:")

        await user.type(memberName, "John Doe")
        await user.selectOptions(memberCategory, "Father")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/expenses",
            expect.objectContaining({
                method: "POST",
            })
        );
    })
    
})