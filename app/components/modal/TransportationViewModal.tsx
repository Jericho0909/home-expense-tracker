'use client'

import { useState } from 'react';
import { TransportationData } from '@/app/constant/expensesData';
import { TransportationBillIcons } from '@/app/constant/billIcons';
import type { TransportationExpense } from '@/app/type/model';
import formattedDate from '@/app/utils/formattedDate';
import { Car, PhilippinePeso } from 'lucide-react';

const ViewTransportationModal = ({id}: {id: string}) => {
    const findExpenses = TransportationData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expenses, ] = useState<TransportationExpense>(findExpenses)
    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4 
                    className="flex items-center text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        {TransportationBillIcons[expenses.category].icon}
                    </span>
                    {expenses.category}
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Record a transportation expense 
                </span>
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

            <div className="flex items-center gap-1">
                <span
                    className="text-base font-semibold mb-1.5"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    Description:
                </span>
                <span
                    className="flex items-center gap-1 text-[#3B2416] text-sm"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    {expenses.description}
                </span>
            </div>

            <div className="flex items-center gap-1">
                <span
                    className="text-base font-semibold mb-1.5"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    Date:
                </span>
                <span
                    className="flex items-center gap-1 text-[#3B2416] text-sm"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    {formattedDate(expenses.date)}
                </span>
            </div>
        </div>
    )
}

export default ViewTransportationModal