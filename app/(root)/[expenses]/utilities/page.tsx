'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import { Lightbulb } from 'lucide-react';
const UtilitiesPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    useEffect(() => {
        setActiveSection("Utilities")
    }, [])
    return (
        <section>
            <div className="flex w-full p-3 mb-8">
                <div className="flex flex-col flex-2 ">
                    <h3 
                        className="flex text-lg font-bold mb-3"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        <span className="mr-2">
                            <Lightbulb size={24} className="text-[#F4C430]"
                            />
                        </span>
                        Utilities 
                    </h3>
                    <span
                        className="text-md italic"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        {currentDate}
                    </span>
                    <span
                        className="text-md italic"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Track and manage your household utility bills
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal/>
                </div>
            </div>
        </section>
    )
}

export default UtilitiesPage