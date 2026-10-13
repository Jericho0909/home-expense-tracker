import { useState, useEffect } from "react"
import type { ExpenseCategory } from "@/type/model"
import { Trash } from 'lucide-react';
import { toast } from "sonner";

type DeleteExpenseProps = {
    category: ExpenseCategory
    id: string
}

const DeleteExpense = ({category, id}: DeleteExpenseProps) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    
    const handleDelete = async(e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        try{
            switch (category) {
                case "Utilities": {
                    const response = await fetch(`/api/expenses/Utilities/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete utility expense: ${response.status} ${response.statusText}`
                        )
                    }
                    
                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                case "FoodAndHousehold": {
                    const response = await fetch(`/api/expenses/FoodAndHousehold/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete food and household expense: ${response.status} ${response.statusText}`
                        )
                    }

                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                case "Transportation": {
                    const response = await fetch(`/api/expenses/Transportation/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete transportation expense: ${response.status} ${response.statusText}`
                        )
                    }

                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                case "Health": {
                    const response = await fetch(`/api/expenses/Health/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete health expense: ${response.status} ${response.statusText}`
                        )
                    }

                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                case "HouseMaintenance": {
                    const response = await fetch(`/api/expenses/HouseMaintenance/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete housemaintenance expense: ${response.status} ${response.statusText}`
                        )
                    }

                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                case "FamilyExpenses": {
                    const response = await fetch(`/api/expenses/FamilyExpenses/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete familyexpenses expense: ${response.status} ${response.statusText}`
                        )
                    }

                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                case "OtherExpenses": {
                    const response = await fetch(`/api/expenses/OtherExpenses/deleteExpense/${id}`,
                        {
                            method: "DELETE"
                        }
                    )

                    if(!response.ok){
                        throw new Error(
                            `Failed to delete otherexpenses expense: ${response.status} ${response.statusText}`
                        )
                    }

                    toast.success("Expense deleted successfully!")
                    return await response.json()
                }

                default:
                    return Response.json({
                        success: false,
                        error: "Invalid category"
                }, { status: 400 })
            }
        }catch(error){
            console.error("Failed to delete expense:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while deleting the expense."
            )
        }
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

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
        <div className="flex flex-col items-center justify-center w-auto h-auto">
            <div className="w-fit rounded-full border border-[#E8B8B0] bg-[#F3D5D0] p-4 transition-colors duration-200 hover:bg-[#EBC0B9]">
                <Trash
                    size={36}
                    color="#8B3A3A"
                    strokeWidth={1.8}
                />
            </div>

            <p 
                className="text-lg italic text-[#8B5E3C]"
                style={{ fontFamily: "--font-playfair-display"}}
            >
                Are you sure you want to delete this expense?
            </p>

            <p 
                className="text-md italic text-[#8B5E3C] mb-2"
                style={{ fontFamily: "--font-playfair-display"}}
            >
                This Action cannot be undone.
            </p>

            <div className="flex items-center justify-evenly pt-4 w-full">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="cancel-btn rounded-lg border border-[#B38B59] bg-[#F1E3D0] px-5 py-2.5 text-sm font-semibold text-[#6B4632] shadow-sm transition-all duration-200 ease-in-out cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={(e) => handleDelete(e, id)}
                    className="del-btn rounded-lg bg-[#8B3A3A] px-5 py-2.5 text-sm font-semibold text-[#FFF8E7] shadow-sm transition-all duration-200 ease-in-out cursor-pointer"
                >
                    Delete Expense
                </button>
            </div>
        </div>
    )
}

export default DeleteExpense