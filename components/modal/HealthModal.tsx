'use client'

import { useState, useContext, useEffect } from "react";
import ExpensesDataContext from "@/context/expensesDataContext";
import ModalContext from "@/context/modalContext";
import ModalFormButton from "../ModalFormButton";
import type { HealthExpense, 
    HealthCategory,
    PaymentMethod
} from "@/type/model"
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Heart } from 'lucide-react';
import { toast } from "sonner";
import { stringify } from "querystring";

type HealthExpenseForm = Omit<HealthExpense, "category" | "paymentMethod"> & {
    category: HealthCategory | "";
    paymentMethod: PaymentMethod | ""
}

const HealthModal = ({id}: {id?: string | null}) => {
    const { healthExpenses } = useContext(ExpensesDataContext)!
    const { isEditing } = useContext(ModalContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const findExpenses = healthExpenses.find((key) => key.id === id)

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

    const [ healthExpense, setHealthExpense ] = useState<HealthExpenseForm>(findExpenses ?? defaultData)

    const HealthCategory: HealthCategory[] = [
        "Medicine",
        "Consultation",
        "Dental",
        "Laboratory",
        "Other",
    ]

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            setIsSendingData(true)
            const response = await fetch("/api/expenses/Health", {
                method: "POST",
                body: JSON.stringify(healthExpense),
            })

            await response.json()
            setHealthExpense(defaultData)
            toast.success("Successfully saved!")

        }catch(error){
            toast.error("Failed to save expense.")
            console.error("Error creating health expense:", error)

        }finally{
            setIsSendingData(false)
        }
    }

    const handleEdit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            setIsSendingData(true)
            const response = await fetch(`/api/expenses/Health/editHealth/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(healthExpense),
                }
            )

            if(!response.ok){
                throw new Error(
                    `Failed to edit health expense: ${response.status} ${response.statusText}`
                )
            }
            
            await response.json()
            toast.success("Health bill edited successfully!")
        }catch(error){
            toast.error("Failed to edit health bill.")
            console.error("Error edit utility expense:", error)
        }finally{
            setIsSendingData(false)
        }
    }

    const handleCancel = () => {
        setHealthExpense(findExpenses ?? defaultData)
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
                        <Heart size={24} className="text-[#D8A7A7]"
                        />
                    </span>
                    {isEditing
                        ? "Edit Health Expense"
                        : "Add Health Expense"
                    }  
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    {isEditing
                        ? "Edit the details of this healthcare expense"
                        : "Record a healthcare expense"
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
                            autoComplete="off"
                            value={healthExpense.category}
                            onChange={(e) =>
                                setHealthExpense((item) => ({
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
                            value={healthExpense.description}
                            onChange={(e) => setHealthExpense((item) => ({
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
                            value={healthExpense.amount || ""}
                            onChange={(e) => setHealthExpense((item) => ({
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
                                    checked={healthExpense.paymentMethod === "Cash"}
                                    onChange={(e) => setHealthExpense((item) => ({
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
                                    checked={healthExpense.paymentMethod === "GCash"}
                                    onChange={(e) => setHealthExpense((item) => ({
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
                                    checked={healthExpense.paymentMethod === "BankTransfer"}
                                    onChange={(e) => setHealthExpense((item) => ({
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
                                    checked={healthExpense.paymentMethod === "Maya"}
                                    onChange={(e) => setHealthExpense((item) => ({
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
                                    checked={healthExpense.paymentMethod === "Other"}
                                    onChange={(e) => setHealthExpense((item) => ({
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
                            value={healthExpense.date.split("T")[0]}
                            onChange={(e) => setHealthExpense((item) => ({
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
                            value={healthExpense.notes}
                            onChange={(e) => setHealthExpense((item) => ({
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
                </div>

                {isSendingData && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#F1E3D0]/60">
                        <div className="loader3">

                        </div>
                    </div>
                )}
            </form>
        </>
    )
}

export default HealthModal