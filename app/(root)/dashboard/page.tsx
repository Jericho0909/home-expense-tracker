'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCards from "@/app/components/SummaryCard"
import { PhilippinePeso } from "lucide-react";
const DashboardPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    useEffect(() => {
        setActiveSection("Dashboard")
    }, [])
    return (
        <section className="flex items-start flex-col w-full min-h-screen p-1">
            <div className="flex w-full p-3 mb-8 border-b-2 border-black">
                <div className="flex-2 ">
                    <h3 
                        className="text-lg font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Zara Family Household Ledger 
                    </h3>
                    <span
                        className="text-md italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        {currentDate}
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal/>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-[40%] h-auto mb-8">
                <div className="flex items-center justify-center h-auto">
                    <SummaryCards
                        title="TOTAL EXPENSES"
                        content={
                            <span 
                                className="flex items-center gap-1 text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                <PhilippinePeso size={16} />
                                5,000
                            </span>
                        }
                    />
                </div>
                <div className="flex items-center justify-center h-auto">
                    <SummaryCards
                        title="THIS MONTH"
                        content={
                            <span 
                                className="flex items-center gap-1 text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                <PhilippinePeso size={16} />
                                5,000
                            </span>
                        }
                    />
                </div>
                <div className="flex items-center justify-center h-auto">
                    <SummaryCards
                        title="REMAINING"
                        content={
                            <span 
                                className="flex items-center gap-1 text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                <PhilippinePeso size={16} />
                                5,000
                            </span>
                        }
                    />
                </div>
            </div>

            <div className="flex w-full h-72 p-1 border border-[#B38B59] mb-8">
                <div className="flex-2">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Expense Overview
                    </span>
                </div>
                <div className="flex-1">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Expense Categories 
                    </span>
                </div>
            </div>

            <div className="block w-full h-64 p-1 border border-[#B38B59] ">
                <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Recent Expenses
                    </span>
            </div>
        </section>
    )
}

export default DashboardPage