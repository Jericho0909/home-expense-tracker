'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"

const FoodAndHousePage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("Food & Household")
    }, [])

    return (
        <section>
            Food and House Page
        </section>
    )
}

export default FoodAndHousePage