'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
const DashboardPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("Dashboard")
    }, [])
    return (
        <section>
            Dashboard Page
        </section>
    )
}

export default DashboardPage