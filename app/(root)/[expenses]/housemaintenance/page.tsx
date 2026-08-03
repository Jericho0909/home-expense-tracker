'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import { Hammer } from 'lucide-react';
import ButtonModal from "@/app/components/ButtonModal";
import SummaryCards from "@/app/components/SummaryCard";
import BillsTable from "@/app/components/BillsTable";
import { HouseMaintenanceData } from "@/app/constant/expensesData"
import { PhilippinePeso } from 'lucide-react';
import type { TableColumn, HouseMaintenanceExpense } from "@/app/type/model"
import formatPurchaseDate from "@/app/utils/formatPurchaseDate"
import { HouseMaintenanceBillIcons } from "@/app/constant/billIcons"


type SummaryType = {
    id: string | number;
    name: string;
    amount?: number,
    itemLength?: string,
    total?: number,
    budget?: number
}

const HouseMaintenance = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const HouseMaintenanceExpenses = HouseMaintenanceData.filter((item) => item.expense === "HouseMaintenance")

    const repairsItems = HouseMaintenanceExpenses.filter((item) => item.category === "Repairs")
    const maintenanceItems = HouseMaintenanceExpenses.filter((item) => item.category === "Maintenance")
    const cleaningItems = HouseMaintenanceExpenses.filter((item) => item.category === "Cleaning")
    const pestControlItems = HouseMaintenanceExpenses.filter((item) => item.category === "PestControl")
    const otherItems = HouseMaintenanceExpenses.filter((item) => item.category === "Other")
    
    const totalRepairs = repairsItems.reduce((total, item) => total + item.amount, 0)
    const totalMaintenance = maintenanceItems.reduce((total, item) => total + item.amount, 0)
    const totalCleaning = cleaningItems.reduce((total, item) => total + item.amount, 0)
    const totalPestControl = pestControlItems.reduce((total, item) => total + item.amount, 0)
    const totalOther = otherItems.reduce((total, item) => total + item.amount, 0)

    const total = totalRepairs + totalMaintenance + totalCleaning + totalPestControl + totalOther
    const budgetLeft = 10000 - total


    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "REPAIRS",
            amount: totalRepairs,
            itemLength: `${repairsItems.length} ${
                repairsItems.length === 1 ? "repair" : "repairs"
            }`
            
        },
        {
            id: 2,
            name: "MAINTENANCE",
            amount: totalMaintenance,
            itemLength: `${maintenanceItems.length} ${
                maintenanceItems.length === 1 ? "maintenance" : "maintenances"
            }`
        },
        {
            id: 3,
            name: "CLEANING",
            amount: totalCleaning,
            itemLength: `${cleaningItems.length} ${
                cleaningItems.length === 1 ? "cleaning" : "cleanings"
            }`
        },
        {
            id: 4,
            name: "PEST CONTROL",
            amount: totalPestControl,
            itemLength: `${pestControlItems.length} ${
                pestControlItems.length === 1 ? "treatment" : "treatments"
            }`
        },
        {
            id: 5,
            name: "OTHER",
            amount: totalOther,
            itemLength: `${otherItems.length} ${
                otherItems.length === 1 ? "purchase" : "purchases"
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

    const HouseMaintenanceColumn: TableColumn<HouseMaintenanceExpense>[] = [
        {
            label: "Description",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {HouseMaintenanceBillIcons[item.category].icon}
                    {item.name}
                </span>
        },
        {
            label: "Category",
            render: (item) =>
               item.category,
        },
        {
            label: "Date",
            render: (item) => formatPurchaseDate(item.purchaseDate),
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
        setActiveSection("HouseMaintenance")
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
                            <Hammer size={24} className="text-[#B8B0A5]"
                            />
                        </span>
                        House Maintenance
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
                        Keep track of repairs, improvements, and home maintenance expenses  
                    </p>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <ButtonModal/>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2 w-4xl h-auto mb-8">
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
                                            {item.itemLength} 
                                        </span>
                                    </div>
                                )}
                                {item.total !== undefined && (
                                    <p className="flex items-center flex-wrap">
                                        
                                        <PhilippinePeso
                                            size={16}
                                        />
                                        {item.total?.toLocaleString("en-US")}
                                        {" "}
                                        {currentDate}
                                    </p>
                                )}
                                {item.budget !== undefined && (
                                    <p 
                                        className="flex items-center flex-wrap gap-1"
                                        style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                    >
                                        <PhilippinePeso size={16} />
                                        {budgetLeft?.toLocaleString("en-US")}
                                        {" "}of{" "}
                                        <PhilippinePeso size={16} />
                                        10,000
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
                        Maintenance Spending 
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
                        Maintenance Breakdown
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
                    <BillsTable
                        data={HouseMaintenanceExpenses}
                        columns={HouseMaintenanceColumn}
                    />
            </div>
            </div>
        </section>
    )
}

export default HouseMaintenance