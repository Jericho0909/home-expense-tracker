'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCards from "@/app/components/SummaryCard"
import BillsTable from "@/app/components/BillsTable"
import { FoodHouseholdData } from "@/app/constant/expensesData"
import type { TableColumn, FoodHouseholdExpense } from "@/app/type/model"
import { CookingPot,
    PhilippinePeso, 
    Circle
} from 'lucide-react';
import formatPurchaseDate from "@/app/utils/formatPurchaseDate"
import { FoodAndHousholdBillIcons } from "@/app/constant/billIcons";


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

    const foodItems = FoodHouseholdData.filter(
        (item) => item.type === "Food"
    )
    const householdItems = FoodHouseholdData.filter(
        (item) => item.type === "Household"
    )
    const totalFood = FoodHouseholdData
        .filter((item) => item.type === "Food")
        .reduce((total, item) => total + item.amount, 0)
    const totalHousehold = FoodHouseholdData
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

    const FoodAndHouseExpenses = FoodHouseholdData.filter((item) => item.expense === "Food&Household")

    const FoodAndHouseColumn: TableColumn<FoodHouseholdExpense>[] = [
        {
            label: "FoodAndHousehold",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {FoodAndHousholdBillIcons[item.category].icon}
                    {item.name}
                </span>
        },
        {
            label: "category",
            render: (item) =>
               {item.category},
        },
        {
            label: "Date",
            render: (item) => item.purchaseDate,
        },
        {
            label: "Amount",
            render: (item) => 
                <span className="flex items-center gap-1">
                    <PhilippinePeso
                        size={16}
                    />
                    {item.amount}
                </span>,
        }
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

            <div className="flex w-full h-72 p-1 border border-[#B38B59] mb-8">
                <div className="flex flex-col flex-2">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Spending Breakdown 
                    </span>
                    <span 
                        className="w-full h-full"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Donut Chart
                    </span>
                    <div className="flex flex-col justify-center w-full h-full">
                        <span
                            style={{ fontFamily: "var(--font-libre-baskerville)"}}
                        >
                            Food 70% 
                        </span>
                        <span
                            style={{ fontFamily: "var(--font-libre-baskerville)"}}
                        >
                            Household 30%
                        </span>
                    </div>
                </div>
                <div className="flex flex-col flex-3 ">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Spending by Category
                    </span>

                </div>
            </div>

            <div className="w-5xl h-auto py-1 px-2 border border-[#B38B59]  mb-8">
                <div className="flex flex-col p-1 w-">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Utility Bills  
                    </span>
                </div>
                <div className="block w-auto min-h-48 p-1">
                    <BillsTable
                        data={FoodAndHouseExpenses}
                        columns={FoodAndHouseColumn}
                    />
                </div>
            </div>

        </section>
    )
}

export default FoodAndHousePage