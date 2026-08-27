'use client'

import { useContext, useEffect, useState } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal";
import SummaryCards from "@/app/components/SummaryCard";
import OtherExepensesModal from "@/app/components/modal/OtherExpensesModal";
import Table from "@/app/components/Table";
import Loading from "../../Loading";
import { OtherExpensesData } from "@/app/constant/expensesData"
import { ReceiptText, PhilippinePeso } from 'lucide-react';
import type { TableColumn, OtherExpense} from "@/app/type/model"
import formatPurchaseDate from "@/app/utils/formatPurchaseDate";
import { OtherExpensesBillIcons } from "@/app/constant/billIcons";

type SummaryType = {
    id: string | number;
    name: string;
    amount?: number,
    month?: string,
    itemLength?: string,
    highestAmount?: number,
    averageExpense?: number
}

const OtherExpensesPage = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const OtherExpenses = OtherExpensesData.filter((item) => item.expense === "OtherExpenses")

    const totalItems = OtherExpenses.length
    const totalExpenses = OtherExpenses.reduce((total, item) => total + item.amount, 0)
    const highestAmount = OtherExpensesData.reduce((max, item) => Math.max(max, item.amount),0)
    const averageExpense =OtherExpensesData.reduce((total, item) => total + item.amount, 0) / OtherExpensesData.length;

    const SummaryDataArr: SummaryType[] = [
            {
                id: 1,
                name: "TOTAL OTHER EXPENSES",
                amount: totalExpenses,
                month: currentDate,
                
            },
            {
                id: 2,
                name: "TOTAL TRANSACTIONS",
                itemLength: `${totalItems} Expenses recorded`
            },
            {
                id: 3,
                name: "LARGEST EXPENSE",
                highestAmount: highestAmount,
            },
    
            {
                id: 4,
                name: "AVERAGE",
                averageExpense: averageExpense,
            }
    ]

    const OtherExpensesColumn: TableColumn<OtherExpense>[] = [
            {
                label: "Description",
                render: (item) => 
                    <span className="flex items-center gap-1">
                        {OtherExpensesBillIcons[item.category].icon}
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
        window.scrollTo(0, 0)
        setActiveSection("OtherExpenses")
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if(isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <section>
            <div className="flex w-full p-3 mb-8 border-b-2 border-black">
                <div className="flex flex-col flex-2 ">
                    <h3 
                        className="flex text-lg font-bold mb-3 text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        <span className="mr-2">
                            <ReceiptText size={24} className="text-[#A89F91]"
                            />
                        </span>
                        Other Expenses
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
                        Track miscellaneous expenses outside your regular categories
                    </p>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal
                        
                        modalContent={<OtherExepensesModal id={null}/>}
                    />
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2 w-full h-auto mb-8">
                {SummaryDataArr.map((item, index) => (
                        <SummaryCards
                            key={index}
                            title={item.name}
                            content={
                                <div 
                                    className="block text-sm"
                                    style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                >
                                    {item.amount !== undefined && (
                                        <div className="flex justify-center flex-col">
                                            <span 
                                                className="flex gap-1"
                                            >
                                                <PhilippinePeso
                                                    size={16}
                                                />
                                                {item.amount?.toLocaleString("en-US")}
                                            </span>
                                            <span>
                                                {item.month}
                                            </span>
                                        </div>
                                    )}
                                    {item.itemLength !== undefined && (
                                        <p className="flex items-center flex-wrap">
                                            {item.itemLength}
                                        </p>
                                    )}
                                    {item.highestAmount !== undefined && (
                                        <p 
                                            className="flex items-center flex-wrap gap-1"
                                            style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                        >
                                            <span className="flex gap-1">
                                                <PhilippinePeso size={16} />
                                                {item.highestAmount?.toLocaleString("en-US")}
                                            </span>
                
                                            Highest expense recorded
                                        </p>
                                    )}
                                    {item.averageExpense !== undefined && (
                                        <p 
                                            className="flex items-center flex-wrap gap-1"
                                            style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                        >
                                            <span className="flex gap-1">
                                                <PhilippinePeso size={16} />
                                                {item.averageExpense?.toLocaleString("en-US")}
                                            </span>
                                            average expense recorded
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
                        Other Expenses Spending
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
                        Expense Categories
                    </span>

                </div>
            </div>

            <div className="w-4xl h-auto py-1 px-2 border border-[#B38B59] mb-8">
                <div className="flex flex-col p-1 w-">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Other Bills
                    </span>
                </div>
                <div className="block w-auto min-h-48 p-1">
                    <Table
                        data={OtherExpenses}
                        columns={OtherExpensesColumn}
                        viewLink="/expenses/otherexpenses/viewOtherExpenses"
                        editLink = "/expenses/otherexpenses/editOtherExpenses"
                    />
                </div>
            </div>
        </section>
    )
}

export default OtherExpensesPage