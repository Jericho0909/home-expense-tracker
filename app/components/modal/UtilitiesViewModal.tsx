'use client'

import { useState } from "react";
import { UtilitiesData } from "@/app/constant/expensesData";
import type { UtilityExpense } from "@/app/type/model";
import { Lightbulb, PhilippinePeso } from "lucide-react";

const ViewUtilitiesModal = ({id}: {id: string}) => {
    const findExpenses = UtilitiesData.find((key) => key.id === id)
    if(!findExpenses) return

    const [ expenses, ] = useState<UtilityExpense>(findExpenses)
    return (
        <div className="flex flex-col border-b-2 border-black mb-4">
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
    )
}

export default ViewUtilitiesModal