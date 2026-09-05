import { useContext } from "react";
import ModalContext from "@/context/modalContext";

const TestModal = () => {
    const modal = useContext(ModalContext)!

    return (
        <>
            <div className="mb-8">
                <span>{modal?.isOpen ? "Open" : "Closed"}</span>
                <button onClick={() => modal?.setIsOpen(true)}>
                    Buksan mo
                </button>

                <button onClick={() => modal?.setIsOpen(false)}>
                    Isara mo
                </button>
            </div>

            <div className="mb-8">
                <div>
                    {modal?.activeModal}
                </div>

                <button
                    onClick={() =>
                        modal?.setActiveModal(<div>Test Modal</div>)
                    }
                >
                    Set Modal
                </button>
            </div>

            <div className="mb-8">
                <button onClick={() => modal?.setIsEditing(true)}>
                    Edit
                </button>

                <span>{modal?.isEditing ? "Editing" : "Not Editing"}</span>
            </div>

            <div className="mb-8">
                <button onClick={() => modal?.closeModal()}>
                    Close Modal
                </button>
            </div>
        </>
    )
}

export default TestModal