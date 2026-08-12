'use client'

import { useState } from "react";
import ModalFormButton from "../ModalFormButton";
import type { HealthExpense, HealthCategory } from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";

type HealthExpenseForm = Omit<HealthExpense, "category"> & {
    category: HealthCategory | "";
}

const HealthModal = () => {
    const defaultData: HealthExpenseForm = {
        id: 0,
        expense: "Health",
        amount: 0,
        createdAt: "",
        description: "",
        category: "",
        date: ""
    }

    const [ healthExpenses, setHealthExpenses ] = useState<HealthExpenseForm>(defaultData)

    const HealthCategory: HealthCategory[] = [
        "Medicine",
        "Consultation",
        "Dental",
        "Laboratory",
        "Other",
    ]

    const handleCancel = () => {
        setHealthExpenses(defaultData)
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit}
        >
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
                    value={healthExpenses.category}
                    onChange={(e) =>
                        setHealthExpenses((item) => ({
                            ...item,
                            category: e.target.value as HealthCategory
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

                    {[...HealthCategory].sort((a, b) => a.localeCompare(b)).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="description"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Description:
                </label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={healthExpenses.description}
                    onChange={(e) => setHealthExpenses((item) => ({
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
                    value={healthExpenses.amount || ""}
                    onChange={(e) => setHealthExpenses((item) => ({
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
                    htmlFor="date"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Date:
                </label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={healthExpenses.date}
                    onChange={(e) => setHealthExpenses((item) => ({
                        ...item,
                        [e.target.name]: e.target.value

                    }))}
                    className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    placeholder=""
                    required
                />
            </div>

            <ModalFormButton
                handleCancel={handleCancel}
            />
        </form>
    )
}

export default HealthModal