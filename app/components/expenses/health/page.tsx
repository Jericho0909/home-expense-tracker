'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCardContent from "@/app/components/SummaryCardContent"
import HealthModal from "@/app/components/modal/HealthModal"
import Table from "@/app/components/Table"
import { HealthData } from "@/app/constant/expensesData"
import { Heart, PhilippinePeso } from 'lucide-react';
import type { TableColumn, 
    HealthExpense,
    SummaryType
} from "@/app/type/model"
import formatPurchaseDate from "@/app/utils/formatPurchaseDate"
import { HealthBillIcons } from "@/app/constant/billIcons"


const HealthPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const HealthExpenses = HealthData.filter((item) => item.expense === "Health")

    const consultationCategories: string[] = [
       "Consultation",
       "Dental",
       "Laboratory"
    ]

    const medicineItems = HealthExpenses.filter((item) => item.category === "Medicine")
    const consultationItems = HealthExpenses.filter((item) => consultationCategories.includes(item.category))
    const otherItems = HealthExpenses.filter((item) => item.category === "Other")

    const totalMedicine = HealthExpenses.filter((item) => item.category === "Medicine").reduce((total, item) => total + item.amount, 0)
    const totalConsultation = HealthExpenses.filter((item) => consultationCategories.includes(item.category)).reduce((total, item) => total + item.amount, 0)
    const totalOther = HealthExpenses.filter((item) => item.category === "Other").reduce((total, item) => total + item.amount, 0)

    const total = totalMedicine + totalConsultation + totalOther
    const budget = 10000
    const budgetLeft = budget - total

    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "MEDICINE",
            amount: totalMedicine,
            itemLength: `${medicineItems.length} ${
                medicineItems.length === 1 ? "purchase" : "purchases"
            }`
            
        },
        {
            id: 2,
            name: "CONSULTATION",
            amount: totalConsultation,
            itemLength: `${consultationItems.length} ${
                consultationItems.length === 1 ? "vist" : "vits"
            }`
        },
        {
            id: 3,
            name: "OTHER",
            amount: totalOther,
            itemLength: `${otherItems.length} ${
                otherItems.length === 1 ? "purchase" : "purchases"
            }`
        },
        {
            id: 4,
            name: "THIS MONTH",
            total: total
            
        },
        {
            id: 5,
            name: "BUDGET LEFT",
            budget: budgetLeft
        },
    ]

    const HealthColumn: TableColumn<HealthExpense>[] = [
        {
            label: "Description",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {HealthBillIcons[item.category].icon}
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

    useEffect(() => {
        setActiveSection("Health")
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
                            <Heart size={24} className="text-[#D8A7A7]"
                            />
                        </span>
                        Health
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
                        Keep track of your family's healthcare expenses 
                    </p>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal
                        modalContent={<HealthModal id={null}/>}
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
                        Health Expenses
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
                        Health Spending 
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
                        data={HealthExpenses}
                        columns={HealthColumn}
                        viewLink="/expenses/utilities/view"
                        editLink = "/expenses/health/editHealth"
                    />
            </div>
            </div>
        </section>
    )
}

export default HealthPage