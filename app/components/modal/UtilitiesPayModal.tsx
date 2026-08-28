'use client'

import { useState, useEffect } from "react"
import { UtilitiesData } from "@/app/constant/expensesData"
import type { UtilityExpense } from "@/app/type/model"
import { PhilippinePeso } from "lucide-react"


const UtilitiesPayModal = ({id}: {id: string}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const findExpenses = UtilitiesData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expense, setExpense ] = useState<UtilityExpense>(findExpenses)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

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
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Pay {expense.name}
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Utilities Bill
                </span>
            </div>

            <div className="flex flex-col  p-3 border mb-3">
                <span
                    className="flex items-center gap-1 text-[#3B2416] text-base font-semibold"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    {expense.name}
                </span>

                <div className="flex items-center gap-2">
                    <span
                        className="text-base font-semibold "
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Date:
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm mt-1"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expense.billingStart} - {expense.billingEnd}
                    </span>

                </div>

                <div className="flex items-center gap-1">
                    <span
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Due Date:
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm mt-1"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expense.dueDate}
                    </span>

                </div>

                <div className="flex items-center justify-between gap-1 mt-5">
                    <span
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Amout Due:
                    </span>
                    <span
                    className="flex gap-1 text-[#3B2416] text-sm mt-1"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    <PhilippinePeso size={16}/>
                    {expense.amount.toLocaleString("en-US")}
                </span>

                </div>
            </div>

            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                {expense.paymentMethod !== undefined
                ? (
                   <div className="flex items-center gap-2">
                        <span
                            className="text-base font-semibold "
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            PaymentMethod:
                        </span>
                        <span
                            className="flex items-center gap-1 text-[#3B2416] text-sm mt-1"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            {expense.paymentMethod}
                        </span>
                    </div>
                )
                : (
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
                                    checked={expense.paymentMethod === "Cash"}
                                    onChange={(e) => setExpense((item) => ({
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
                                    checked={expense.paymentMethod === "GCash"}
                                    onChange={(e) => setExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
                                    }))}
                                />
                                <span>GCash</span>
                            </label>

                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Bank Transfer"
                                    checked={expense.paymentMethod === "Bank Transfer"}
                                    onChange={(e) => setExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
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
                                    checked={expense.paymentMethod === "Maya"}
                                    onChange={(e) => setExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
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
                                    checked={expense.paymentMethod === "Other"}
                                    onChange={(e) => setExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
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
                )}

                {expense.paymentMethod !== undefined
                ? (
                    <div className="flex items-center gap-2">
                        <span
                            className="text-base font-semibold "
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Paid At:
                        </span>
                        <span
                            className="flex items-center gap-1 text-[#3B2416] text-sm mt-1"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            {expense.paidAt}
                        </span>
                    </div>
                )
                : (
                        <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="paidAt"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Paid At:
                        </label>
                        <input
                            id="paidAt"
                            type="date"
                            name="paidAt"
                            value={expense.paidAt}
                            onChange={(e) => setExpense((item) => ({
                                ...item,
                                [e.target.name]: e.target.value
                            }))}
                            className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>
                )}

                {expense.paymentMethod === undefined && (
                    <button
                        type="submit"
                        className="paid-btn rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                    >
                        Mark as Paid
                    </button>
                )}
            </form>
        </div>
    )
}

export default UtilitiesPayModal