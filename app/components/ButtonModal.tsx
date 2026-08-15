'use client'

import { useContext, type ReactNode } from "react"
import ModalContext from "../context/modalContext"

interface ButtonModalProps {
    modalContent: ReactNode
}

const ButtonModal = ({ modalContent }: ButtonModalProps) => {
    const { setIsOpen,  setActiveModal } = useContext(ModalContext)!

    const openModal = () => {
        setIsOpen(true)
        setActiveModal(modalContent)
    }
    return (
        <button
            type="button"
            onClick={openModal}
            className="bg-[#8B5E3C] text-[#F8F4E9] px-5 py-2 rounded-md hover:bg-[#70482F] cursor-pointer"
        >
            + Add Expense
        </button>
    )
}

export default ButtonModal