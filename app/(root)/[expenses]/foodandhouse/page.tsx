'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import { CookingPot } from 'lucide-react';

const FoodAndHousePage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    useEffect(() => {
        setActiveSection("Food&Household")
    }, [])

    return (
        <section>
            <div className="flex w-full p-3 mb-8 border-b-2 border-black">
                <div className="flex flex-col flex-2 ">
                    <h3 
                        className="flex text-lg font-bold mb-3 text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        <span className="mr-2">
                            <CookingPot size={24} className="text-[#B87333]"
                            />
                        </span>
                        Food & Household
                    </h3>
                    <span
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        {currentDate}
                    </span>
                    <span
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Track your family's food and household spending
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal/>
                </div>
            </div>
        </section>
    )
}

export default FoodAndHousePage