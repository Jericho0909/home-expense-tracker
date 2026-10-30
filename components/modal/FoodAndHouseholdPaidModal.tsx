'use client'

import { useState, useEffect, useContext } from "react"
import ExpensesDataContext from "@/context/expensesDataContext"
import type { FoodHouseholdExpense, StatusType } from "@/type/model"
import { StatusIcons, } from "@/constant/billIcons"
import formattedDate from "@/utils/formattedDate"
import { toast } from "sonner"

const FoodAndHouseholdPaidModal = ({id}: {id: string}) => {
    const { foodAndHouseholdExpenses } = useContext(ExpensesDataContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const findExpenses = foodAndHouseholdExpenses.find((key) => key.id === id)
    if(!findExpenses) return

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    const [ expense,  ] = useState<FoodHouseholdExpense>(findExpenses)
    const [paymentMethod, setPaymentMethod] = useState<FoodHouseholdExpense["paymentMethod"]>(undefined)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const updatedExpense = {
            ...expense,
            status: "Paid" as StatusType,
            paymentMethod: paymentMethod,
            paidAt: currentDate
        }

        try{
            setIsSendingData(true)
            const response = await fetch(`/api/expenses/FoodAndHousehold/paidFoodAndHousehold/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedExpense),
            })

            if(!response.ok){
                throw new Error(
                    `Failed to pay food and household expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            toast.success("Payment recorded successfully!")

        }catch(error){
            toast.error("Failed to record payment. Please try again.");
            console.error("Error record payment:", error)
        }finally{
            setIsSendingData(false)
        }
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
                        {expense.purchaseDate !== null
                            ? formattedDate(expense.purchaseDate)
                            : "-"
                        }   
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
                <div className={isSendingData ? "blur-[1px]" : ""}>
                    {["Pending", "Overdue", "Unpaid"].includes(expense.status)
                    ? (
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
                                        value="BankTransfer"
                                        checked={paymentMethod === "BankTransfer"}
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
                    )
                    : (
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
                    )}

                    {["Pending", "Overdue", "Unpaid"].includes(expense.status)&& (
                        <button
                            type="submit"
                            className="paid-btn w-full rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                        >
                            Mark as Paid
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default FoodAndHouseholdPaidModal