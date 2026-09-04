import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import TestModal from "@/app/components/TestModal";
import { ModalProvider } from "../context/modalContext";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}))

const mockBack = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
    back: mockBack
})

describe("TestModal", () => {
    test("should open modal when Open is clicked", async () => {
        const user = userEvent.setup()

        render(
            <ModalProvider>
                <TestModal />
            </ModalProvider>
        )

        expect(screen.getByText("Closed")).toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: "Buksan mo" }))

        expect(screen.getByText("Open")).toBeInTheDocument()
    })

    test("should see the active modal when set", async () => {
        const user = userEvent.setup()

        render(
            <ModalProvider>
                <TestModal />
            </ModalProvider>
        )

        await user.click(screen.getByRole("button", { name: "Set Modal" }))

        expect(screen.getByText("Test Modal")).toBeInTheDocument()
    })

    test("should set isEditing to true when Edit is clicked", async () => {
        const user = userEvent.setup()

        render(
            <ModalProvider>
                <TestModal />
            </ModalProvider>
        )

        await user.click(screen.getByRole("button", { name: "Edit" }))

        expect(screen.getByText("Editing")).toBeInTheDocument()

        expect(mockBack).toHaveBeenCalled()
    })

    

})