'use client'

import { useState } from "react";
import ModalFormButton from "../ModalFormButton";
import type { FoodHouseholdExpense, 
    FoodAndHouseHoldCategory,
} from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";


type FoodHouseholdExpenseForm = Omit<FoodHouseholdExpense, "category"> & {
    category: FoodAndHouseHoldCategory | "";
}

type FoodHouseholdType = "" | "Food" | "Household"
const FoodAndHouseholdModal = () => {
    const defaultData: FoodHouseholdExpenseForm = {
        id: 0,
        expense: "FoodAndHousehold",
        amount: 0,
        createdAt: "",
        name: "",
        type: "",
        category: "",
        purchaseDate: ""
    }

    const [ foodHouseholdExpenses, setFoodHouseholdExpenses ] = useState<FoodHouseholdExpenseForm>(defaultData)

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

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(foodHouseholdExpenses)
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit}
        >
            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="name"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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
                    htmlFor="category"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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

                    {FoodHouseholdCategory.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <ModalFormButton
                handleCancel={handleCancel}
            />
        </form>
        
    )
}

export default FoodAndHouseholdModal