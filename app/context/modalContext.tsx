'use client'

import { createContext, ReactNode, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ExpenseSection } from "../type/model";

interface ModalTypes {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    modalTitle: string;
    setModalTitle: Dispatch<SetStateAction<string>>;
    activeModal: ExpenseSection | null;
    setActiveModal:  Dispatch<SetStateAction<ExpenseSection | null>>;
    closeModal: () => void;
}

const ModalContext = createContext<ModalTypes | null>(null)

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ modalTitle, setModalTitle ] = useState<string>("")
    const [ activeModal, setActiveModal ] = useState<ExpenseSection | null>(null);

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                modalTitle,
                setModalTitle,
                activeModal,
                setActiveModal,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext