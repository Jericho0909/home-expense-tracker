'use client'

import { createContext, useState, useEffect } from "react";
import { getExpenses } from "@/lib/expenses";
import type { UtilityExpense } from "@/type/model";

interface ExpensesDataContextType {
    utilitiesExpenses: UtilityExpense[];
    setUtilitiesExpenses: React.Dispatch<React.SetStateAction<UtilityExpense[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const ExpensesDataContext = createContext<ExpensesDataContextType | null>(null)

export const ExpensesDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ limit, setLimit ] = useState<number>(10)
    const [ utilitiesExpenses, setUtilitiesExpenses ] = useState<UtilityExpense[]>([])

    useEffect(() => {
        const fetchUtilitiesExpenses = async () => {
            try{
                const data = await getExpenses("Utilities", currentPage, limit)
                setUtilitiesExpenses(data)
            }catch (error) {
                console.error("Failed to fetch utilities expenses:", error)
            }
        }

        fetchUtilitiesExpenses()
    }, [currentPage, limit])

    return(
        <ExpensesDataContext.Provider 
            value={{ 
                utilitiesExpenses, 
                setUtilitiesExpenses,
                setCurrentPage,
                setLimit
             }}>
            {children}
        </ExpensesDataContext.Provider>
    )
}

export default ExpensesDataContext