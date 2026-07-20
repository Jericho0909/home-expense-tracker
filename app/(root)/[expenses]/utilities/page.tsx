'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
const UtilitiesPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("Utilities")
    }, [])
    return (
        <section>
            Utilities Page
        </section>
    )
}

export default UtilitiesPage