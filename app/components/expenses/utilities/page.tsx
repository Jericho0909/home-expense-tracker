'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCards from "@/app/components/SummaryCard";
import UtilitiesModal from "@/app/components/modal/UtilitiesModal";
import { UtilitiesData } from "@/app/constant/expensesData";
import type { TableColumn, UtilityExpense } from "@/app/type/model";
import { 
    Lightbulb,
    PhilippinePeso, 
    Circle
} from "lucide-react";
import Table from "@/app/components/Table";
import formatBillingPeriod from "@/app/utils/formatBillingPeriod";
import { UtilityBillIcons, StatusIcons, StatusColor } from "@/app/constant/billIcons";


const UtilitiesPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const utilitiesExpenses = UtilitiesData.filter((item) => item.expense === "Utilities")

    const utilitiesColumn: TableColumn<UtilityExpense>[] = [
        {
            label: "Utility",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {item.name && UtilityBillIcons[item.name]?.icon}
                    {item.name}
                </span>
        },
        {
            label: "Billing Period",
            render: (item) =>
                formatBillingPeriod(
                    item.billingStart,
                    item.billingEnd
                ),
        },
        {
            label: "Due Date",
            render: (item) => item.dueDate,
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
        },
        {
            label: "Status",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {StatusIcons[item.status].icon}
                    {item.status}
                </span>
        },
    ]
   
    useEffect(() => {
        setActiveSection("Utilities")
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
                            <Lightbulb size={24} className="text-[#F4C430]"
                            />
                        </span>
                        Utilities 
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
                        Track and manage your household utility bills
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal
                        modalContent={<UtilitiesModal id={null}/>}
                    />
                </div>
            </div>

            <div className="grid grid-cols-6 gap-2 w-full h-auto mb-8">
                {UtilitiesData.map((item, index) => (
                    <SummaryCards
                        key={index}
                        title={item.name}
                        content={
                            <div 
                                className="block text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                <span className="flex items-center">
                                    <PhilippinePeso
                                        size={16}
                                    />
                                    {item.amount?.toLocaleString("en-US")}
                                </span>
                                <span 
                                    className="flex items-center gap-1 text-sm"
                                    style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                >
                                    <Circle
                                        size={10}
                                        color={StatusColor[item.status]}
                                        fill={StatusColor[item.status]}
                                    />
                                    {item.status}
                                </span>
                            </div>
                        }
                    />
                ))}
                <SummaryCards
                        key={-1}
                        title="Total"
                        content={
                            <div className="block">
                                <span className="flex items-center">
                                    <PhilippinePeso
                                        size={16}
                                    />
                                    10,000
                                </span>
                                <span className="flex items-center gap-1">
                                    {currentDate}
                                </span>
                            </div>
                        }
                    />
            </div>

            <div className="flex w-full h-72 p-1 border border-[#B38B59] mb-8">
                <div className="flex-2">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Monthly Utility Expenses
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
                    <Table
                        data={utilitiesExpenses}
                        columns={utilitiesColumn}
                        viewLink="/expenses/utilities/view"
                        editLink = "/expenses/utilities/editUtilities"
                    />
                </div>
            </div>
            
        </section>
    )
}

export default UtilitiesPage