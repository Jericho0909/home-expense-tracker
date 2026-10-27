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
            className="text-sm font-semibold bg-[#8B5E3C] text-[#F8F4E9] px-5 py-4 rounded-lg hover:bg-[#70482F] cursor-pointer"
            style={{ fontFamily: "var(--font-cinzel)"}}
        >
            + ADD EXPENSE
        </button>
    )
}

export default ButtonModal