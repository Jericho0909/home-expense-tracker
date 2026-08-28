'use client'

import { useState, useEffect } from "react";
import { UtilitiesData } from "@/app/constant/expensesData";
import type { UtilityExpense, PaymentMethod } from "@/app/type/model";
import { StatusIcons } from "@/app/constant/billIcons";
import formatBillingPeriod from "@/app/utils/formatBillingPeriod";
import formattedDate from "@/app/utils/formattedDate";
import { Lightbulb, PhilippinePeso } from "lucide-react";

type UtilityExpenseItems = Omit<UtilityExpense, "paymentMethod"> & {
    paymentMethod?: PaymentMethod | ""

}

const ViewUtilitiesModal = ({id}: {id: string}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const findExpenses = UtilitiesData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expenses, ] = useState<UtilityExpenseItems>(findExpenses)

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
            <div className="flex flex-col border-b-2 border-black mb-2">
                <h4 
                    className="flex text-lg font-bold mb-2 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <Lightbulb size={24} className="text-[#F4C430]"
                        />
                    </span>
                    Add Utility Bill 
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Utility Bill Details  
                </span>
            </div>

            <div className="flex flex-col p-1 mb-2">
                <div
                    className="flex flex-col p-2"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Name
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expenses.name}
                    </span>
                </div>
            </div>

            <div className="flex flex-col p-1 mb-2">
                <div
                    className="flex flex-col p-2"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Status
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {StatusIcons[expenses.status].icon}
                        {expenses.status}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-3 border-dashed border mb-2">
                <span
                    className="text-base font-semibold mb-1.5"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    Amount
                </span>
                <span
                    className="flex gap-1 text-[#3B2416] text-sm"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    <PhilippinePeso size={16}/>
                    {expenses.amount.toLocaleString("en-US")}
                </span>
            </div>

            <div className="flex justify-between p-1 mb-2">
                <div className="flex flex-col justify-center">
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Billing Period
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {formatBillingPeriod(expenses.billingStart, expenses.billingEnd)}
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Due Date
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {formattedDate(expenses.billingEnd)}
                    </span>
                </div>

                <div className="flex flex-col justify-center">
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Created
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {formattedDate(expenses.createdAt)}
                    </span>
                </div>
            </div>

            <div className="flex justify-between p-1 mb-2">
                <div
                    className="flex flex-col p-2"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Payment Method
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expenses.paymentMethod !== "" 
                            ? expenses.paymentMethod
                            : "Pending"
                        }
                    </span>
                </div>

                <div
                    className="flex flex-col p-2"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Paid At
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expenses.paidAt !== "" 
                            ? expenses.paymentMethod
                            : "Pending"
                        }
                    </span>
                </div>
            </div>

            <div className="flex flex-col p-1 mb-2">
                <div
                    className="flex flex-col p-2"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    <span
                        className="text-base font-semibold mb-1.5"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Notes
                    </span>
                    <p
                        className="flex items-center gap-1 xl:w-md wrap-break-word text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expenses.notes}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ViewUtilitiesModal