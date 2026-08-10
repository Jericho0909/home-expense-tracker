import type { ReactNode } from "react";

interface ModalProps {
    title: string;
    children: ReactNode
}

const Modal = ({title, children}: ModalProps) => {
    const onClose = () => {
        console.log("asdas")
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-[#F5F5DC] p-6 shadow-xl">

                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-xl font-semibold text-[#3B2416]"
                        style={{
                            fontFamily: "var(--font-libre-baskerville)"
                        }}
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#3B2416] hover:text-red-700"
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