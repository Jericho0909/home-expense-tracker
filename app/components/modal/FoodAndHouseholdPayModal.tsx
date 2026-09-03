'use client'

import { useState, useEffect } from "react"
import { FoodHouseholdData } from "@/app/constant/expensesData"
import type { FoodHouseholdExpense } from "@/app/type/model"
import { StatusIcons, } from "@/app/constant/billIcons"

const FoodAndHouseholdPayModal = ({id}: {id: string}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const findExpenses = FoodHouseholdData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expense, setExpense ] = useState<FoodHouseholdExpense>(findExpenses)
    const [paymentMethod, setPaymentMethod] = useState<FoodHouseholdExpense["paymentMethod"]>(undefined)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch(`/api/foodandhousehold/${id}`, {
            method: "PUT",
            body: JSON.stringify(expense),
        })

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
                    Food And Household Bill
                </span>
            </div>

            <div className="flex flex-col  p-3 border mb-3">
                <span
                    className="flex items-center gap-1 text-[#3B2416] text-base font-semibold"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    {expense.name}
                </span>

                <div className="flex items-end gap-1">
                    <span
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Purchase Date:
                    </span>
                    <span
                        className="text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expense.purchaseDate}
                    </span>
                </div>

                <div className="flex items-end gap-1">
                    <span
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Amount:
                    </span>
                    <span
                        className="text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expense.amount}
                    </span>
                </div>

                <div className="flex items-end gap-1">
                    <span
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Status:
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {StatusIcons[expense.status].icon}
                        {expense.status}
                    </span>
                </div>

            </div>

            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                {expense.paymentMethod !== undefined
                ? (
                   <div className="flex items-end gap-1">
                        <span
                            className="text-base font-semibold "
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            PaymentMethod:
                        </span>
                        <span
                            className="text-[#3B2416] text-sm"
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
                                    checked={paymentMethod === "Cash"}
                                    onChange={(e) => setPaymentMethod(e.target.value as FoodHouseholdExpense["paymentMethod"])}
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
                                    checked={paymentMethod === "GCash"}
                                    onChange={(e) => setPaymentMethod(e.target.value as FoodHouseholdExpense["paymentMethod"])}
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
                                    checked={paymentMethod === "Bank Transfer"}
                                    onChange={(e) => setPaymentMethod(e.target.value as FoodHouseholdExpense["paymentMethod"])}
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
                                    checked={paymentMethod === "Maya"}
                                    onChange={(e) => setPaymentMethod(e.target.value as FoodHouseholdExpense["paymentMethod"])}
                                    
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
                                    checked={paymentMethod === "Other"}
                                    onChange={(e) => setPaymentMethod(e.target.value as FoodHouseholdExpense["paymentMethod"])}
                                    
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

export default FoodAndHouseholdPayModal