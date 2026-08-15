'use client'

import { useEffect, useRef, useContext, type ReactNode } from "react";
import ModalContext from "@/app/context/modalContext";

interface ModalProps {
    children: ReactNode;
}

const Modal = ({children}: ModalProps) => {
    const { isOpen, closeModal } = useContext(ModalContext)!
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                closeModal()
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    if(!isOpen) return

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div 
                className="relative w-full max-w-md rounded-lg bg-[#F1E3D0] p-6 shadow-xl"
            >

                <div className="absolute top-3 right-5 flex items-center justify-end mb-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="cursor-pointer text-[#3B2416] hover:text-red-700"
                    >
                        ✕
                    </button>
                </div>

                {children}

            </div>
        </div>
    )
}

export default Modal