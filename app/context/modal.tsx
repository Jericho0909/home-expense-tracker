'use client'

import { createContext, ReactNode, useState } from "react";

interface ModalTypes {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalTypes | null>(null)

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext