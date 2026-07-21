'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import MainSummaryCards from "@/app/components/MainSummaryCard"
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
            <div className="flex w-full p-3 mb-14">
                <div className="flex-2 ">
                    <h3 
                        className="text-lg"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Zara Family Household Ledger 
                    </h3>
                    <span
                        className="text-lg"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        {currentDate}
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <button 
                        className="bg-[#8B5E3C] text-[#F8F4E9] px-5 py-2 rounded-md hover:bg-[#70482F] cursor-pointer"
                    >
                        + Add Expense
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-[50%] h-auto">
                <div className="flex items-center justify-center h-auto">
                    <MainSummaryCards
                        title="TOTAL EXPENSES"
                        content="45,250"
                    />
                </div>
                <div className="flex items-center justify-center h-auto">
                    <MainSummaryCards
                        title="TOTAL EXPENSES"
                        content="45,250"
                    />
                </div>
                <div className="flex items-center justify-center h-auto">
                    <MainSummaryCards
                        title="TOTAL EXPENSES"
                        content="45,250"
                    />
                </div>
            </div>
        </section>
    )
}

export default DashboardPage