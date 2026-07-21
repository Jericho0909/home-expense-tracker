'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
const DashboardPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("Dashboard")
    }, [])
    return (
        <section className="min-h-screen p-1 border border-red-500">
            <div className="flex p-3 border border-red-500">
                <div className="flex-2 border border-blue-500">
                    asd
                </div>
                <div className="flex-1 border border-pink-500">
                    ds
                </div>
            </div>
        </section>
    )
}

export default DashboardPage