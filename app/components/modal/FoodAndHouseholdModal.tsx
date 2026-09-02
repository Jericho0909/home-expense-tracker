'use client'

import { useState, useEffect } from "react";
import { FoodHouseholdData } from "@/app/constant/expensesData";
import ModalFormButton from "../ModalFormButton";
import type { FoodHouseholdExpense, 
    FoodAndHouseHoldCategory,
} from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { CookingPot } from 'lucide-react';


type FoodHouseholdExpenseForm = Omit<FoodHouseholdExpense, "category"> & {
    category: FoodAndHouseHoldCategory | "";
}

type FoodHouseholdType = "" | "Food" | "Household"
const FoodAndHouseholdModal = ({id}: {id?: string | null}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const findExpenses = FoodHouseholdData.find((key) => key.id === id)
    const defaultData: FoodHouseholdExpenseForm = {
        id: "0",
        expense: "FoodAndHousehold",
        amount: 0,
        createdAt: "",
        name: "",
        type: "",
        category: "",
        purchaseDate: "",
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

    const handleCancel = () => {
        setFoodHouseholdExpenses(defaultData)
    }

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const response = await fetch("/api/expenses", {
            method: "POST",
            body: JSON.stringify(foodHouseholdExpenses),
        });


        return response
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
                    Food & Household Bills
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Record a food or household expense
                </span>
            </div>
            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
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
                        value={foodHouseholdExpenses.purchaseDate}
                        onChange={(e) => setFoodHouseholdExpenses((item) => ({
                            ...item,
                            [e.target.name]: e.target.value

                        }))}
                        className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        placeholder=""
                        required
                    />
                </div>

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
                        required
                    />
                </div>

                <ModalFormButton
                    handleCancel={handleCancel}
                />
            </form>
        </>
        
    )
}

export default FoodAndHouseholdModal