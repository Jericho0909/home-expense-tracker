'use client'

import { createContext, useState, useEffect } from "react";
import { getExpenses } from "@/lib/expenses";
import type { UtilityExpense,
    FoodHouseholdExpense,
    TransportationExpense,
    HealthExpense,
    HouseMaintenanceExpense,
    FamilyExpense,
    OtherExpense,
} from "@/type/model";

interface ExpensesDataContextType {
    utilitiesExpenses: UtilityExpense[];
    setUtilitiesExpenses: React.Dispatch<React.SetStateAction<UtilityExpense[]>>;
    foodAndHouseholdExpenses: FoodHouseholdExpense[];
    setFoodAndHouseholdExpenses: React.Dispatch<React.SetStateAction<FoodHouseholdExpense[]>>;
    transportationExpenses: TransportationExpense[];
    setTransportationExpenses: React.Dispatch<React.SetStateAction<TransportationExpense[]>>;
    healthExpenses: HealthExpense[];
    setHealthExpenses: React.Dispatch<React.SetStateAction<HealthExpense[]>>;
    houseMaintenanceExpenses: HouseMaintenanceExpense[];
    setHouseMaintenanceExpenses: React.Dispatch<React.SetStateAction<HouseMaintenanceExpense[]>>;
    familyExpenses: FamilyExpense[];
    setFamilyExpenses: React.Dispatch<React.SetStateAction<FamilyExpense[]>>;
    otherExpenses: OtherExpense[];
    setOtherExpenses: React.Dispatch<React.SetStateAction<OtherExpense[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const ExpensesDataContext = createContext<ExpensesDataContextType | null>(null)

export const ExpensesDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ limit, setLimit ] = useState<number>(10)
    const [ utilitiesExpenses, setUtilitiesExpenses ] = useState<UtilityExpense[]>([])
    const [ foodAndHouseholdExpenses, setFoodAndHouseholdExpenses ] = useState<FoodHouseholdExpense[]>([])
    const [ transportationExpenses, setTransportationExpenses ] = useState<TransportationExpense[]>([])
    const [ healthExpenses, setHealthExpenses ] = useState<HealthExpense[]>([])
    const [ houseMaintenanceExpenses, setHouseMaintenanceExpenses ] = useState<HouseMaintenanceExpense[]>([])
    const [ familyExpenses, setFamilyExpenses ] = useState<FamilyExpense[]>([])
    const [ otherExpenses, setOtherExpenses ] = useState<OtherExpense[]>([])

    useEffect(() => {
        const fetchUtilitiesExpenses = async () => {
            try{
                const response = await getExpenses("Utilities", currentPage, limit)
                setUtilitiesExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch utilities expenses:", error)
            }
        }

        const fetchFoodAndHouseholdExpenses = async () => {
            try{
                const response = await getExpenses("FoodAndHousehold", currentPage, limit)
                setFoodAndHouseholdExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch food and household expenses:", error)
            }
        }

        const fetchTransportationExpenses = async () => {
            try{
                const response = await getExpenses("Transportation", currentPage, limit)
                setTransportationExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch transportation expenses:", error)
            }
        }

        const fetchHealthExpenses = async () => {
            try{
                const response = await getExpenses("Health", currentPage, limit)
                setHealthExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch health expenses:", error)
            }
        }

        const fetchHouseMaintenanceExpenses = async () => {
            try{
                const response = await getExpenses("HouseMaintenance", currentPage, limit)
                setHouseMaintenanceExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch house maintenance expenses:", error)
            }
        }

        const fetchFamilyExpenses = async () => {
            try{
                const response = await getExpenses("FamilyExpenses", currentPage, limit)
                setFamilyExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch family expenses:", error)
            }
        }

        const fetchOtherExpenses = async () => {
            try{
                const response = await getExpenses("OtherExpenses", currentPage, limit)
                setOtherExpenses(response.data)
            }catch (error) {
                console.error("Failed to fetch other expenses:", error)
            }
        }

        fetchUtilitiesExpenses()
        fetchFoodAndHouseholdExpenses()
        fetchTransportationExpenses()
        fetchHealthExpenses()
        fetchHouseMaintenanceExpenses()
        fetchFamilyExpenses()
        fetchOtherExpenses()
    }, [currentPage, limit])

    return(
        <ExpensesDataContext.Provider 
            value={{ 
                utilitiesExpenses, 
                setUtilitiesExpenses,
                foodAndHouseholdExpenses,
                setFoodAndHouseholdExpenses,
                transportationExpenses,
                setTransportationExpenses,
                healthExpenses,
                setHealthExpenses,
                houseMaintenanceExpenses,
                setHouseMaintenanceExpenses,
                familyExpenses,
                setFamilyExpenses,
                otherExpenses,
                setOtherExpenses,
                setCurrentPage,
                setLimit
             }}>
            {children}
        </ExpensesDataContext.Provider>
    )
}

export default ExpensesDataContext