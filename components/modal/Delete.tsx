import { useState, useEffect, useContext } from "react"
import ModalContext from "@/context/modalContext";
import type { Category, ActionContent } from "@/type/model"
import { Trash } from 'lucide-react';
import { toast } from "sonner";

type DeleteExpenseProps = {
    category?: Category
    action?: ActionContent
    id: string
}

const Delete = ({category, action, id}: DeleteExpenseProps) => {
    const { closeModal } = useContext(ModalContext)!
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
                    
                    await response.json()
                    toast.success("Expense deleted successfully!")
                    setTimeout(() => {
                        closeModal()
                    }, 100)

                    return
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

                    await response.json()
                    toast.success("Expense deleted successfully!")
                    setTimeout(() => {
                        closeModal()
                    }, 100)

                    return
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

                    await response.json()
                    toast.success("Expense deleted successfully!")
                    setTimeout(() => {
                        closeModal()
                    }, 100)

                    return
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

                    await response.json()
                    toast.success("Expense deleted successfully!")
                    setTimeout(() => {
                        closeModal()
                    }, 100)

                    return
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

                    await response.json()
                    toast.success("Expense deleted successfully!")
                    setTimeout(() => {
                        closeModal()
                    }, 100)

                    return
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

                    await response.json()
                    toast.success("Expense deleted successfully!")
                    setTimeout(() => {
                        closeModal()
                    }, 100)

                    return
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

    const handleDelMember = async(e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        try{
            const response = await fetch(`/api/familyMembers/deleteFamilyMember/${id}`, 
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if(!response.ok){
                throw new Error(
                    `Failed to delete family member: ${response.status} ${response.statusText}`
                )
            }
                
            await response.json()
            toast.success("Member deleted successfully!")
            setTimeout(() => {
                closeModal()
            }, 100)

            return

        }catch(error){
            console.error("Failed to delete family member:", error);
            toast.error(
                error instanceof Error
                ? error.message
                : "Something went wrong while deleting the family member."
            )
        }
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
                {action === "deleteFamilyMember"
                    ? "Are you sure you want to delete this family member?"
                    : "Are you sure you want to delete this expense?"
                }
            </p>

            <p 
                className="text-md italic text-[#8B5E3C] mb-3"
                style={{ fontFamily: "--font-playfair-display"}}
            >
                This Action cannot be undone.
            </p>

            <button
                type="button"
                onClick={action !== "deleteFamilyMember" ? (e) => handleDelete(e, id) : (e) => handleDelMember(e, id)}
                className="del-btn rounded-lg bg-[#8B3A3A] px-5 py-2.5 text-sm font-semibold text-[#FFF8E7] shadow-sm transition-all duration-200 ease-in-out cursor-pointer"
            >
                {action === "deleteFamilyMember"
                    ? "Delete Family Member"
                    : "Delete Expense"
                }
            </button>
        </div>
    )
}

export default Delete