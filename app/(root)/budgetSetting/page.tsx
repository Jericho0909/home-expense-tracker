'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext";

const BudgerSettingPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!

    useEffect(() => {
        setActiveSection("BudgetSetting")
    }, [])
    return (
        <div>
            Budget Setting Page
        </div>
    )
}

export default BudgerSettingPage