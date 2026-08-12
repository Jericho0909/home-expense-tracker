'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCardContent from "@/app/components/SummaryCardContent"
import Table from "@/app/components/Table"
import { FamilyExpensesData } from "@/app/constant/expensesData"
import { HouseHeart, PhilippinePeso } from 'lucide-react';
import type { SummaryType, 
    TableColumn, 
    FamilyExpense 
} from "@/app/type/model"
import { FamilyExpensesBillIcons } from "@/app/constant/billIcons"
import formatPurchaseDate from "@/app/utils/formatPurchaseDate"

const FamilyExpenses = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })
    useEffect(() => {
        setActiveSection("FamilyExpenses")
    }, [])

    const FamilyExpenses = FamilyExpensesData.filter((item) => item.expense === "FamilyExpenses")

    const allowanceItems = FamilyExpenses.filter((item) => item.category === "Allowance")
    const educationItems = FamilyExpenses.filter((item) => item.category === "Education")
    const entertainmentItems = FamilyExpenses.filter((item) => item.category === "Entertainment")
    const celebrationsItems = FamilyExpenses.filter((item) => item.category === "Celebrations")
    const otherItems = FamilyExpenses.filter((item) => item.category === "Other")

    const totalAllowance = allowanceItems.reduce((total, item) => total + item.amount, 0)
    const totalEducation = educationItems.reduce((total, item) => total + item.amount, 0)
    const totalEntertainment = entertainmentItems.reduce((total, item) => total + item.amount, 0)
    const totalCelebrations = celebrationsItems.reduce((total, item) => total + item.amount, 0)
    const totalOther = otherItems.reduce((total, item) => total + item.amount, 0)

    const total = totalAllowance + totalEducation + totalEntertainment + totalCelebrations + totalOther
    const budget = 30000
    const budgetLeft = budget - total

    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "ALLOWANCE",
            amount: totalAllowance,
            itemLength: `${allowanceItems.length} ${
                allowanceItems.length === 1 ? "item" : "items"
            }`
            
        },
        {
            id: 2,
            name: "EDUCATION",
            amount: totalEducation,
            itemLength: `${educationItems.length} ${
                educationItems.length === 1 ? "item" : "items"
            }`
        },
        {
            id: 3,
            name: "ENTERTAINMENT",
            amount: totalEntertainment,
            itemLength: `${entertainmentItems.length} ${
                entertainmentItems.length === 1 ? "item" : "items"
            }`
        },

        {
            id: 4,
            name: "CELEBRATIONS",
            amount: totalCelebrations,
            itemLength: `${celebrationsItems.length} ${
                celebrationsItems.length === 1 ? "item" : "items"
            }`
        },
        {
            id: 5,
            name: "OTHER",
            amount: totalOther,
            itemLength: `${otherItems.length} ${
                otherItems.length === 1 ? "item" : "items"
            }`
        },
        {
            id: 6,
            name: "THIS MONTH",
            total: total
            
        },
        {
            id: 7,
            name: "BUDGET LEFT",
            budget: budgetLeft
        },
    ]

    const FamilyExpensesColumn: TableColumn<FamilyExpense>[] = [
            {
                label: "Description",
                render: (item) => 
                    <span className="flex items-center gap-1">
                        {FamilyExpensesBillIcons[item.category].icon}
                        {item.description}
                    </span>
            },
            {
                label: "Category",
                render: (item) =>
                   item.category,
            },
            {
                label: "Date",
                render: (item) => formatPurchaseDate(item.date),
            },
            {
                label: "Amount",
                render: (item) => 
                    <span className="flex items-center gap-1">
                        <PhilippinePeso
                            size={16}
                        />
                        {item.amount.toLocaleString("en-US")}
                    </span>,
            }
    ]

    return (
        <section>
            <div className="flex w-full p-3 mb-8 border-b-2 border-black">
                <div className="flex flex-col flex-2 ">
                    <h3 
                        className="flex text-lg font-bold mb-3 text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        <span className="mr-2">
                            <HouseHeart size={24} className="text-[#E3B778]"
                            />
                        </span>
                        Family Expenses
                    </h3>
                    <span
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        {currentDate}
                    </span>
                    <p
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Keep track of expenses for your family's needs and activities
                    </p>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal
                        modalTitle={
                            <div className="flex flex-col">
                                <h4 
                                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                                    style={{ fontFamily: "var(--font-cinzel)"}}
                                >
                                    <span className="mr-2">
                                        <HouseHeart size={24} className="text-[#E3B778]"
                                        />
                                    </span>
                                    Family Expenses
                                </h4>
                                <span
                                    className="text-base italic text-[#8B5E3C]"
                                    style={{ fontFamily: "var(--font-cinzel)"}}
                                >
                                    Record a family-related expense
                                </span>
                            </div>
                        }
                        modalContent={"FamilyExpenses"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2 w-4xl h-auto mb-8">
                <SummaryCardContent
                    summaryDataArr={SummaryDataArr}
                    budgetLeft={budgetLeft}
                    budget={budget}
                />
            </div>

            <div className="flex w-full h-72 p-1 border border-[#B38B59] mb-8">
                <div className="flex flex-col flex-2">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Family Spending
                    </span>
                    <span 
                        className="w-full h-full"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        bar chart
                    </span>
                </div>
                <div className="flex flex-col flex-3 ">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Family Breakdown
                    </span>

                </div>
            </div>

            <div className="w-4xl h-auto py-1 px-2 border border-[#B38B59] mb-8">
                <div className="flex flex-col p-1 w-">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Health Bills  
                    </span>
                </div>
                <div className="block w-auto min-h-48 p-1">
                    <Table
                        data={FamilyExpenses}
                        columns={FamilyExpensesColumn}
                    />
                </div>
            </div>
        </section>
    )
}

export default FamilyExpenses