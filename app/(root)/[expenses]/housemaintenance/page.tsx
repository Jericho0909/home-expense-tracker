'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"

const HouseMaintenance = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("HouseMaintenance")
    }, [])

    return (
        <section>
            House Maintenance
        </section>
    )
}

export default HouseMaintenance