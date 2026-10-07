'use client'

import { useState, useContext, useEffect } from "react";
import ExpensesDataContext from "@/context/expensesDataContext";
import ModalContext from "@/context/modalContext";
import ModalFormButton from "../ModalFormButton";
import type { FoodHouseholdExpense, 
    FoodAndHouseHoldCategory,
    StatusType,
} from "@/type/model"
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { CookingPot } from 'lucide-react';
import { toast } from "sonner";


type FoodHouseholdExpenseForm = Omit<FoodHouseholdExpense, "category" | "status"> & {
    category: FoodAndHouseHoldCategory | "";
    status: StatusType | "";
}

type FoodHouseholdType = "" | "Food" | "Household"
const FoodAndHouseholdModal = ({id}: {id?: string | null}) => {
    const { foodAndHouseholdExpenses } = useContext(ExpensesDataContext)!
    const { isEditing } = useContext(ModalContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const findExpenses = foodAndHouseholdExpenses.find((key) => key.id === id)
    const defaultData: FoodHouseholdExpenseForm = {
        id: "0",
        expense: "FoodAndHousehold",
        amount: 0,
        createdAt: "",
        name: "",
        type: "",
        category: "",
        status: "",
        notes: ""
    }

    const [ foodHouseholdExpenses, setFoodHouseholdExpenses ] = useState<FoodHouseholdExpenseForm>(findExpenses ?? defaultData)

    const FoodHouseholdCategory: FoodAndHouseHoldCategory[] = [
        "Groceries",
        "Meat",
        "Seafood",
        "Fruits",
        "Vegetables",
        "Snacks",
        "Beverages",
        "Cleaning",
        "Laundry",
        "PersonalCare",
        "Kitchen",
        "HomeSupplies",
    ]

    const FoodHouseholdStatus: StatusType[] = [
        "Paid",
        "Pending",
        "Overdue",
        "Unpaid"
    ]

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(foodHouseholdExpenses)
        try{
            setIsSendingData(true)
            const response = await fetch("/api/expenses/FoodAndHousehold", {
                method: "POST",
                body: JSON.stringify(foodHouseholdExpenses),
            })

            if(!response.ok) {
                throw new Error(
                    `Failed to create food and household expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            setFoodHouseholdExpenses(defaultData)
            toast.success("Successfully saved!")
        }catch (error){
            toast.error("Failed to save expense.")
            console.error("Error creating food and household expense:", error)
        }finally{
            setIsSendingData(false)
        }
    }

    const handleEdit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setIsSendingData(true)
            const response = await fetch(`/api/expenses/FoodAndHousehold/editFoodAndHousehold/${id}`, {
                method: "PUT",
                body: JSON.stringify(foodHouseholdExpenses)
            })

            if(!response.ok){
                throw new Error(
                    `Failed to edit food and house expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            toast.success("Food and Household bill edited successfully!")
        }catch(error){
            toast.error("Failed to edit food and household bill.")
            console.error("Error edit food and household expense:", error)
        }finally{
            setIsSendingData(false)
        }
    }

    const handleCancel = () => {
        setFoodHouseholdExpenses(findExpenses ?? defaultData)
    }

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

    return (
        <>
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <CookingPot size={24} className="text-[#B87333]"
                        />
                    </span>
                    {isEditing
                        ? "Edit Food & Household Bills"
                        : "Food & Household Bills"
                    }
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    {isEditing
                        ? "Edit the details of this food or household expense"
                        :"Record a food or household expense"                    
                    }
                </span>
            </div>
            <form
                className="flex flex-col relative"
                onSubmit={isEditing ? handleEdit : handleSubmit}
            >
                <div className={isSendingData ? "blur-[1px]" : ""}>
                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="category"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Category:
                        </label>
                    <select
                        id="category"
                        value={foodHouseholdExpenses.category}
                        onChange={(e) =>
                            setFoodHouseholdExpenses((item) => ({
                                ...item,
                                category: e.target.value as FoodAndHouseHoldCategory
                            }))
                        }
                        className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                        style={{
                            fontFamily: "var(--font-libre-baskerville)"
                        }}
                    >
                        <option value="" disabled>
                            Select Category
                        </option>

                        {[...FoodHouseholdCategory].sort((a, b) => a.localeCompare(b)).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="status"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Status:
                        </label>
                        <select
                            id="status"
                            value={foodHouseholdExpenses.status}
                            onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                ...item,
                                status: e.target.value as StatusType
                            }))}
                            className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                            style={{fontFamily: "var(--font-libre-baskerville)"}}
                            required
                        >
                            <option value="" disabled className="cursor-pointer">
                                Select status
                            </option>
                            {FoodHouseholdStatus.map((status) => (
                                <option 
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="type"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Type:
                        </label>
                        <select
                            id="type"
                            value={foodHouseholdExpenses.type}
                            onChange={(e) =>
                                setFoodHouseholdExpenses((item) => ({
                                    ...item,
                                    type: e.target.value as FoodHouseholdType
                                }))
                            }
                            className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                            style={{
                                fontFamily: "var(--font-libre-baskerville)"
                            }}
                            required
                        >
                            <option value="" disabled>
                                Select Type
                            </option>

                            {["Food", "Household" ].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="name"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Name:
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={foodHouseholdExpenses.name}
                            onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                ...item,
                                [e.target.name]: capitalizeFirstLetter(e.target.value)

                            }))}
                            className="no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="amount"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Amount:
                        </label>
                        <input
                            id="amount"
                            type="number"
                            name="amount"
                            min="0"
                            step="0.01"
                            value={foodHouseholdExpenses.amount || ""}
                            onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    {foodHouseholdExpenses.status === "Paid" && (
                        <div className="flex flex-col justify-between p-1 mb-3">
                            <label
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
                                }}
                            >
                                Payment Method:
                            </label>

                            <div className="flex flex-wrap gap-4">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Cash"
                                        checked={foodHouseholdExpenses.paymentMethod === "Cash"}
                                        onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                            ...item,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                    <span
                                        className="text-[#3B2416] text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                    >
                                        Cash
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="GCash"
                                        checked={foodHouseholdExpenses.paymentMethod === "GCash"}
                                        onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                            ...item,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                    <span
                                        className="text-[#3B2416] text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                    > 
                                        GCash
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="BankTransfer"
                                        checked={foodHouseholdExpenses.paymentMethod === "BankTransfer"}
                                        onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                            ...item,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                    <span
                                        className="text-[#3B2416] text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                    >
                                        Bank Transfer
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Maya"
                                        checked={foodHouseholdExpenses.paymentMethod === "Maya"}
                                        onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                            ...item,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                    <span
                                        className="text-[#3B2416] text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                    >
                                        Maya
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Other"
                                        checked={foodHouseholdExpenses.paymentMethod === "Other"}
                                        onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                            ...item,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                    <span
                                        className="text-[#3B2416] text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                    >
                                        Other
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    {foodHouseholdExpenses.status === "Paid" && (
                        
                        <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                            <label
                                htmlFor="purchaseDate"
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
                                }}
                            >
                                Purchase Date:
                            </label>
                            <input
                                id="purchaseDate"
                                type="date"
                                name="purchaseDate"
                                value={foodHouseholdExpenses.purchaseDate ? foodHouseholdExpenses.purchaseDate.split("T")[0] : ""}
                                onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                    ...item,
                                    [e.target.name]: e.target.value

                                }))}
                                className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                                style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                placeholder=""
                            />
                        </div>
                    )}

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="notes"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Notes:
                        </label>
                        <textarea
                            name="notes"
                            value={foodHouseholdExpenses.notes}
                            onChange={(e) => setFoodHouseholdExpenses((item) => ({
                                ...item,
                                [e.target.name]: e.target.value
                            }))}
                            className="resize-none bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder="Add notes..."
                            rows={4}
                            spellCheck={false}
                        />
                    </div>

                    <ModalFormButton
                        handleCancel={handleCancel}
                    />

                    {isSendingData && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#F1E3D0]/60">
                            <div className="loader3">
                                
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </>
        
    )
}

export default FoodAndHouseholdModal