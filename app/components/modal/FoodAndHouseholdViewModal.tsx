'use client'

import { useState } from 'react';
import { FoodHouseholdData } from '@/app/constant/expensesData';
import type { FoodHouseholdExpense } from '@/app/type/model';
import { CookingPot, PhilippinePeso } from 'lucide-react';

const ViewFoodAndHouseholdModal = ({id}: {id: string}) => {
    const findExpenses = FoodHouseholdData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expenses, setExpenses ] = useState<FoodHouseholdExpense>(findExpenses)
    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <CookingPot size={24} className="text-[#B87333]"
                        />
                    </span>
                    {expenses.type}
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Food & Household Expense 
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
                        Category:
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#3B2416] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    >
                        {expenses.category}
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
                        {expenses.purchaseDate}
                    </span>
                </div>
        </div>
    )
}

export default ViewFoodAndHouseholdModal