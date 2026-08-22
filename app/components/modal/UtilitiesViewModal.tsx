'use client'

import { useState } from "react";
import { UtilitiesData } from "@/app/constant/expensesData";
import type { UtilityExpense } from "@/app/type/model";
import { StatusIcons } from "@/app/constant/billIcons";
import formatBillingPeriod from "@/app/utils/formatBillingPeriod";
import { Lightbulb, PhilippinePeso } from "lucide-react";

const ViewUtilitiesModal = ({id}: {id: string}) => {
    const findExpenses = UtilitiesData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expenses, ] = useState<UtilityExpense>(findExpenses)
    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-3">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
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

            <div className="flex flex-col mb-3">
                <div
                    className="flex flex-col p-4"
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

            <div className="flex flex-col items-center justify-center p-3 border-dashed border mb-3">
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

            <div className="flex justify-between p-3">
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
                        {expenses.billingEnd}
                    </span>
                </div>
            </div>

            <div className="flex flex-col">
                <div
                    className="flex flex-col p-4"
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
                        Created
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expenses.createdAt}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewUtilitiesModal