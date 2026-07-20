'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"

const Transportation = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("Transportation")
    }, [])

    return (
        <section>
            Transportation
        </section>
    )
}

export default Transportation