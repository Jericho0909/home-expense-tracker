'use client'

import { createContext, useState, useEffect } from "react";
import type { ExpenseBudget } from "@/type/model";
import { getAllExpensesBudget } from "@/lib/budget";

interface BudgetType {
    budget: ExpenseBudget[];
    setBudget: React.Dispatch<React.SetStateAction<ExpenseBudget[]>>
}

const BudgetContext = createContext<BudgetType | null>(null)

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
    const [ budget, setBudget ] = useState<ExpenseBudget[]>([])

    useEffect(() => {
        const fetchBudget = async () => {
            try{
                const response = await getAllExpensesBudget()
                setBudget(response.data)
            }catch(error){
                console.error("Failed to fetch all expenses budget:", error)
            }
        }

        fetchBudget()
    }, [])

    return(
        <BudgetContext.Provider
            value={{
                budget,
                setBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}

export default BudgetContext