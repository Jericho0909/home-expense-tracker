'use client'

import { useState } from "react";
import type { FoodHouseholdExpense, FoodAndHouseHoldCategory } from "@/app/type/model"


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

    return (
        <div className="flex justify-center flex-col gap-2 mb-2 p-1">
            <label
                htmlFor="foodandhousehold-Type"
                className="text-base"
                style={{
                    fontFamily: "var(--font-libre-baskerville)"
                }}
            >
                Type:
            </label>
            <select
                id="foodandhousehold-Type"
                value={foodHouseholdExpenses.name}
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
    )
}

export default FoodAndHouseholdModal