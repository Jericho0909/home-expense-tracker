'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"

const FamilyExpenses = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("FamilyExpenses")
    }, [])

    return (
        <section>
            Family Expenses
        </section>
    )
}

export default FamilyExpenses