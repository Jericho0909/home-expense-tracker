import { render, screen, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import EditMemberModal from "./EditMemberModal";
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

describe("EditMemberModal", () => {
    test("Should submit edit member form", async () => {
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
                <EditMemberModal id="1" />
            </ModalProvider>
        )

        act(() => {
            jest.advanceTimersByTime(2500)
        })

        const submitButton = screen.getByRole("button", {
            name: "Save",
        });

        const memberName = screen.getByLabelText("Name:")
        const memberCategory = screen.getByLabelText("Category:")

        await user.type(memberName, "John Doe")
        await user.selectOptions(memberCategory, "Father")

        await user.click(submitButton)

        expect(fetch).toHaveBeenCalledWith(
            "/api/members/1",
            expect.objectContaining({
                method: "PUT",
            })
        );
    })
})