'use client'

import { useContext } from "react"
import ModalContext from "../context/modalContext"
import type { ExpenseSection } from "../type/model"

interface ButtonModalProps {
    modalTitle: string
    modalContent: ExpenseSection
}

const ButtonModal = ({ modalTitle, modalContent }: ButtonModalProps) => {
    const { setIsOpen, setModalTitle, setActiveModal } = useContext(ModalContext)!

    const openModal = () => {
        setIsOpen(true)
        setModalTitle(modalTitle)
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