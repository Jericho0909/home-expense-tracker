'use client'

import { useEffect, useRef, useContext, type ReactNode } from "react";
import ModalContext from "@/app/context/modalContext";

interface ModalProps {
    title: ReactNode;
    children: ReactNode
}

const Modal = ({title, children}: ModalProps) => {
    const { closeModal } = useContext(ModalContext)!
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div 
                ref={modalRef}
                className="w-full max-w-md rounded-lg bg-[#F5F5DC] p-6 shadow-xl"
            >

                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="flex text-xl font-semibold text-[#3B2416]"
                        style={{
                            fontFamily: "var(--font-libre-baskerville)"
                        }}
                    >
                        {title}
                    </h2>

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