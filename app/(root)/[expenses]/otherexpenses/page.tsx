'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"

const OtherExpenses = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("OtherExpenses")
    }, [])

    return (
        <section>
            Other Expenses
        </section>
    )
}

export default OtherExpenses