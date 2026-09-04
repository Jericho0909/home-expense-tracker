import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalFormButton from "../ModalFormButton";


describe("ModalFormButton", () => {
    test("Should call handleCancel when Cancel is clicked", async () => {
        const mockCancel = jest.fn();

        const user = userEvent.setup()

        render(
            <ModalFormButton handleCancel={mockCancel} />
        );

        const cancelButton = screen.getByRole("button", {
            name: "Cancel",
        })

        await user.click(cancelButton)

        expect(mockCancel).toHaveBeenCalled()
    })
})