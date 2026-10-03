'use client'

import { createContext, useState, useEffect } from "react";
import { getExpenses } from "@/lib/expenses";
import type { UtilityExpense,
    FoodHouseholdExpense,
} from "@/type/model";

interface ExpensesDataContextType {
    utilitiesExpenses: UtilityExpense[];
    setUtilitiesExpenses: React.Dispatch<React.SetStateAction<UtilityExpense[]>>;
    foodAndHouseholdExpenses: FoodHouseholdExpense[];
    setFoodAndHouseholdExpenses: React.Dispatch<React.SetStateAction<FoodHouseholdExpense[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const ExpensesDataContext = createContext<ExpensesDataContextType | null>(null)

export const ExpensesDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ limit, setLimit ] = useState<number>(10)
    const [ utilitiesExpenses, setUtilitiesExpenses ] = useState<UtilityExpense[]>([])
    const [ foodAndHouseholdExpenses, setFoodAndHouseholdExpenses ] = useState<FoodHouseholdExpense[]>([])

    useEffect(() => {
        const fetchUtilitiesExpenses = async () => {
            try{
                const data = await getExpenses("Utilities", currentPage, limit)
                setUtilitiesExpenses(data)
            }catch (error) {
                console.error("Failed to fetch utilities expenses:", error)
            }
        }

        const fetchFoodAndHouseholdExpenses = async () => {
            try{
                const data = await getExpenses("FoodAndHousehold", currentPage, limit)
                setFoodAndHouseholdExpenses(data)
            }catch (error) {
                console.error("Failed to fetch food and household expenses:", error)
            }
        }

        fetchUtilitiesExpenses()
        fetchFoodAndHouseholdExpenses()
    }, [currentPage, limit])

    return(
        <ExpensesDataContext.Provider 
            value={{ 
                utilitiesExpenses, 
                setUtilitiesExpenses,
                foodAndHouseholdExpenses,
                setFoodAndHouseholdExpenses,
                setCurrentPage,
                setLimit
             }}>
            {children}
        </ExpensesDataContext.Provider>
    )
}

export default ExpensesDataContext