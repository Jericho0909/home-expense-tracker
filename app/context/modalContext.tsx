'use client'

import { createContext, 
    ReactNode, 
    useState, 
    Dispatch, 
    SetStateAction } from "react";
import { useRouter } from "next/navigation";
import type { ModalContents } from "../type/model";

interface ModalTypes {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    activeModal: ReactNode;
    setActiveModal:  Dispatch<SetStateAction<ReactNode>>;
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>
    closeModal: () => void;
}

const ModalContext = createContext<ModalTypes | null>(null)

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const router = useRouter()
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ activeModal, setActiveModal ] = useState<ReactNode>(null)
    const [ isEditing, setIsEditing ] = useState<boolean>(false)

    const closeModal = () => {
        if(isEditing) {
            router.back()
            setIsEditing(false)
        }
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                activeModal,
                setActiveModal,
                isEditing,
                setIsEditing,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext