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
    Member
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

        const fetchTransportationExpenses = async () => {
            try{
                const data = await getExpenses("Transportation", currentPage, limit)
                setTransportationExpenses(data)
            }catch (error) {
                console.error("Failed to fetch transportation expenses:", error)
            }
        }

        const fetchHealthExpenses = async () => {
            try{
                const data = await getExpenses("Health", currentPage, limit)
                setHealthExpenses(data)
            }catch (error) {
                console.error("Failed to fetch health expenses:", error)
            }
        }

        const fetchHouseMaintenanceExpenses = async () => {
            try{
                const data = await getExpenses("HouseMaintenance", currentPage, limit)
                setHouseMaintenanceExpenses(data)
            }catch (error) {
                console.error("Failed to fetch house maintenance expenses:", error)
            }
        }

        const fetchFamilyExpenses = async () => {
            try{
                const data = await getExpenses("FamilyExpenses", currentPage, limit)
                setFamilyExpenses(data)
            }catch (error) {
                console.error("Failed to fetch family expenses:", error)
            }
        }

        const fetchOtherExpenses = async () => {
            try{
                const data = await getExpenses("OtherExpenses", currentPage, limit)
                setOtherExpenses(data)
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