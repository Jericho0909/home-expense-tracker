'use client'

import { useState, useEffect } from "react"
import { HouseMaintenanceData } from "@/app/constant/expensesData"
import ModalFormButton from "../ModalFormButton"
import type { HouseMaintenanceExpense, 
    HouseMaintenanceCategory,
    PaymentMethod
} from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter"
import { Hammer } from 'lucide-react';

type HouseMaintenanceExpenseForm = Omit<HouseMaintenanceExpense, "category" | "paymentMethod"> & {
    category: HouseMaintenanceCategory | "";
    paymentMethod: PaymentMethod | "";
}

const HouseMaintenanceModal = ({id}: {id?: string | null}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const findExpenses = HouseMaintenanceData.find((key) => key.id === id)

    const defaultData: HouseMaintenanceExpenseForm = {
        id: "0",
        expense: "HouseMaintenance",
        amount: 0,
        createdAt: "",
        description: "",
        category: "",
        date: "",
        paymentMethod: "",
        notes: ""
    }

    const [ houseMaintenanceExpense, setHouseMaintenanceExpense ] = useState<HouseMaintenanceExpenseForm>(findExpenses ?? defaultData)

    const HouseMaintenanceCategory: HouseMaintenanceCategory[] = [
        "Repairs",
        "Maintenance",
        "Cleaning",
        "PestControl",
        "Other",
    ]

    const handleCancel = () => {
        setHouseMaintenanceExpense(defaultData)
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch("/api/expenses", {
            method: "POST",
            body: JSON.stringify(houseMaintenanceExpense),
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
                        <Hammer size={24} className="text-[#B8B0A5]"
                        />
                    </span>
                    Add Maintenance Expense
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Record a house maintenance expense
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
                        value={houseMaintenanceExpense.category}
                        onChange={(e) =>
                            setHouseMaintenanceExpense((item) => ({
                                ...item,
                                category: e.target.value as HouseMaintenanceCategory
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

                        {[...HouseMaintenanceCategory].sort((a, b) => a.localeCompare(b)).map((category) => (
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
                        value={houseMaintenanceExpense.description}
                        onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                        value={houseMaintenanceExpense.amount || ""}
                        onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                                checked={houseMaintenanceExpense.paymentMethod === "Cash"}
                                onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                                checked={houseMaintenanceExpense.paymentMethod === "GCash"}
                                onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                                checked={houseMaintenanceExpense.paymentMethod === "Bank Transfer"}
                                onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                                checked={houseMaintenanceExpense.paymentMethod === "Maya"}
                                onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                                checked={houseMaintenanceExpense.paymentMethod === "Other"}
                                onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                        value={houseMaintenanceExpense.date}
                        onChange={(e) => setHouseMaintenanceExpense((item) => ({
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
                        value={houseMaintenanceExpense.notes}
                        onChange={(e) => setHouseMaintenanceExpense((item) => ({
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

export default HouseMaintenanceModal