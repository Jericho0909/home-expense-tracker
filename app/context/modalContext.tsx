'use client'

import { createContext, ReactNode, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ModalContents } from "../type/model";

interface ModalTypes {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    activeModal: ReactNode;
    setActiveModal:  Dispatch<SetStateAction<ReactNode>>;
    closeModal: () => void;
}

const ModalContext = createContext<ModalTypes | null>(null)

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ activeModal, setActiveModal ] = useState<ReactNode>(null);

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
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