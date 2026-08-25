'use client'

import { useState } from "react";
import { HealthData } from "@/app/constant/expensesData";
import ModalFormButton from "../ModalFormButton";
import type { HealthExpense, 
    HealthCategory,
    PaymentMethod
} from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { Heart } from 'lucide-react';

type HealthExpenseForm = Omit<HealthExpense, "category" | "paymentMethod"> & {
    category: HealthCategory | "";
    paymentMethod: PaymentMethod | ""
}

const HealthModal = ({id}: {id?: string | null}) => {
    const findExpenses = HealthData.find((key) => key.id === id)

    const defaultData: HealthExpenseForm = {
        id: "0",
        expense: "Health",
        amount: 0,
        createdAt: "",
        description: "",
        category: "",
        date: "",
        paymentMethod: "",
        notes: ""
    }

    const [ healthExpenses, setHealthExpenses ] = useState<HealthExpenseForm>(findExpenses ?? defaultData)

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
        <>
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <Heart size={24} className="text-[#D8A7A7]"
                        />
                    </span>
                    Add Health Expense  
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Record a healthcare expense
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
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
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

                <div className="flex flex-col justify-between p-1 mb-3">
                    <label
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Payment Method
                    </label>

                    <div className="flex flex-wrap gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Cash"
                                checked={healthExpenses.paymentMethod === "Cash"}
                                onChange={(e) => setHealthExpenses((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
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
                                checked={healthExpenses.paymentMethod === "GCash"}
                                onChange={(e) => setHealthExpenses((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
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
                                value="Bank Transfer"
                                checked={healthExpenses.paymentMethod === "Bank Transfer"}
                                onChange={(e) => setHealthExpenses((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
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
                                checked={healthExpenses.paymentMethod === "Maya"}
                                onChange={(e) => setHealthExpenses((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                                
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
                                checked={healthExpenses.paymentMethod === "Other"}
                                onChange={(e) => setHealthExpenses((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                                
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

                <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                    <label
                        htmlFor="date"
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
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
                        value={healthExpenses.notes}
                        onChange={(e) => setHealthExpenses((item) => ({
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

export default HealthModal