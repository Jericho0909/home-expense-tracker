import { useState, useEffect } from "react"
import type { ExpenseCategory } from "@/type/model"

type DeleteExpenseProps = {
    category: ExpenseCategory
}

const DeleteExpense = ({category}: DeleteExpenseProps) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500)

        return () => clearTimeout(timer)
    }, [])

    if(isLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-auto h-20">
                <div className="loader2">

                </div>
            </div>
        )
    }

    return(
        <div className="flex flex-col items-center justify-center w-auto h-32">
            <p 
                className="text-lg italic text-[#8B5E3C] mb-1"
                style={{ fontFamily: "--font-playfair-display"}}
            >
                Are you sure you want to delete this expense?
            </p>

            <p 
                className="text-lg italic text-[#8B5E3C] mb-2"
                style={{ fontFamily: "--font-playfair-display"}}
            >
                This Action cannot be undone.
            </p>

            <div className="flex items-center justify-evenly pt-4 w-full">
                <button
                    type="button"
                    className="rounded-lg border border-[#B38B59] bg-[#F1E3D0] px-5 py-2.5 text-sm font-semibold text-[#6B4632] shadow-sm transition-all duration-200 ease-in-out hover:bg-[#E5D0B5] hover:shadow-md active:scale-95 cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="rounded-lg bg-[#8B3A3A] px-5 py-2.5 text-sm font-semibold text-[#FFF8E7] shadow-sm transition-all duration-200 ease-in-out hover:bg-[#702D2D] hover:shadow-md active:scale-95 cursor-pointer"
                >
                    Delete Expense
                </button>
            </div>
        </div>
    )
}

export default DeleteExpense