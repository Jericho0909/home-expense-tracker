'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCards from "@/app/components/SummaryCard"
import { FoodHouseholdDummyData } from "@/app/constant/expensesData"
import { CookingPot,
    PhilippinePeso, 
    Circle
} from 'lucide-react';
import { UtilityBillIcons, StatusIcons, StatusColor } from "@/app/constant/billIcons";

type SummaryType = {
    id: string | number;
    name: string;
    totalAmount?: number;
    totalItems?: number;
    monthTotalAmount?: number;
    month?: string;
    budgetLeft?: number;
    budget?: number;
}

const FoodAndHousePage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const foodItems = FoodHouseholdDummyData.filter(
        (item) => item.type === "Food"
    )
    const householdItems = FoodHouseholdDummyData.filter(
        (item) => item.type === "Household"
    )
    const totalFood = FoodHouseholdDummyData
        .filter((item) => item.type === "Food")
        .reduce((total, item) => total + item.amount, 0)
    const totalHousehold = FoodHouseholdDummyData
        .filter((item) => item.type === "Household")
        .reduce((total, item) => total + item.amount, 0)
    
    const total = totalFood + totalHousehold    
    const budget = 15000
    const budgetLeft = budget - total

    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "FOOD",
            totalAmount: totalFood,
            totalItems: foodItems.length
        },
        {
            id: 2,
            name: "HOUSEHOLD",
            totalAmount: totalHousehold,
            totalItems: householdItems.length
        },
        {
            id: 3,
            name: "THIS MONTH",
            monthTotalAmount: total,
            month: currentDate
        },
        {
            id: 4,
            name: "BUDGET LEFT",
            budgetLeft: budgetLeft,
            budget: budget
        },
    ]

    useEffect(() => {
        setActiveSection("Food&Household")
    }, [])

    return (
        <section>
            <div className="flex w-full p-3 mb-8 border-b-2 border-black">
                <div className="flex flex-col flex-2 ">
                    <h3 
                        className="flex text-lg font-bold mb-3 text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        <span className="mr-2">
                            <CookingPot size={24} className="text-[#B87333]"
                            />
                        </span>
                        Food & Household
                    </h3>
                    <span
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        {currentDate}
                    </span>
                    <span
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Track your family's food and household spending
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal/>
                </div>
            </div>

            <div className="grid grid-cols-6 gap-2 w-full h-auto mb-8">
                {SummaryDataArr.map((item, index) => (
                    <SummaryCards
                        key={index}
                        title={item.name}
                        content={
                            <div 
                                className="block text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                {item.totalItems !== undefined && (
                                    <div className="flex flex-col">
                                        <span className="flex items-center">
                                            <PhilippinePeso
                                                size={16}
                                            />
                                            {item.totalAmount?.toLocaleString("en-US")}
                                        </span>
                                        <span>
                                            {item.totalItems} Items
                                        </span>
                                    </div>
                                )}
                                {item.monthTotalAmount !== undefined && (
                                    <span className="flex items-center">
                                        <PhilippinePeso
                                            size={16}
                                        />
                                        {item.monthTotalAmount?.toLocaleString("en-US")}
                                    </span>
                                )}
                                {item.month && (
                                    <p>{item.month}</p>
                                )}
                                {item.budgetLeft !== undefined && item.budget !== undefined && (
                                    <p 
                                        className="flex text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                    >
                                        <span
                                            className="flex items-center gap-1 mr-1"
                                        >
                                            <PhilippinePeso
                                                size={16}
                                            /> 
                                            {item.budgetLeft?.toLocaleString("en-US")}
                                        </span> 
                                        of 
                                        <span
                                            className="flex items-center gap-1 ml-1"
                                        >
                                            <PhilippinePeso
                                                size={16}
                                            /> 
                                            {item.budget?.toLocaleString("en-US")}
                                        </span> 
                                </p>
                                )}
                            </div>
                        }
                    />
                ))}
            </div>
        </section>
    )
}

export default FoodAndHousePage