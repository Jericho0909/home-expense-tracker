'use client'

import { createContext, ReactNode, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ModalContents } from "../type/model";

interface ModalTypes {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    modalTitle: ReactNode
    setModalTitle: Dispatch<SetStateAction<ReactNode>>;
    activeModal: ModalContents | null;
    setActiveModal:  Dispatch<SetStateAction<ModalContents | null>>;
    closeModal: () => void;
}

const ModalContext = createContext<ModalTypes | null>(null)

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ modalTitle, setModalTitle ] = useState<ReactNode>(null);
    const [ activeModal, setActiveModal ] = useState<ModalContents | null>(null);

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