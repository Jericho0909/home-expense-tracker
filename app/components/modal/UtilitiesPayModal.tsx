'use client'

import { useState } from "react"
import { UtilitiesData } from "@/app/constant/expensesData"
import type { UtilityExpense } from "@/app/type/model"
import { PhilippinePeso } from "lucide-react"

const UtilitiesPayModal = ({id}: {id: string}) => {
    const findExpenses = UtilitiesData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expenses, setExpenses ] = useState<UtilityExpense>(findExpenses)

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Pay {expenses.name}
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Utilities Bill
                </span>
            </div>

            <div className="flex flex-col p-3 border mb-3">
                <span
                    className="flex items-center gap-1 text-[#3B2416] text-sm"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    {expenses.name}
                </span>

                <div className="flex items-center gap-2">
                    <span
                        className="text-base font-semibold"
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
                        {expenses.billingStart} - {expenses.billingEnd}
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
                        {expenses.dueDate}
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
                    className="flex gap-1 text-[#3B2416] text-sm"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    <PhilippinePeso size={16}/>
                    {expenses.amount.toLocaleString("en-US")}
                </span>

                </div>
            </div>
        </div>
    )
}

export default UtilitiesPayModal