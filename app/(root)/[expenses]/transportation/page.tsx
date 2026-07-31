'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCards from "@/app/components/SummaryCard"
import BillsTable from "@/app/components/BillsTable"
import { Car,
    PhilippinePeso, 
} from 'lucide-react';
import { TransportationData } from "@/app/constant/expensesData"
import type { TableColumn, TransportationExpense } from "@/app/type/model"
import formatPurchaseDate from "@/app/utils/formatPurchaseDate"
import { TransportationBillIcons } from "@/app/constant/billIcons"

type SummaryType = {
    id: string | number;
    name: string;
    amount?: number,
    itemLength?: string,
    total?: number,
    budget?: number

}

const Transportation = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const transportationExpenses = TransportationData.filter((item) => item.expense === "Transportation")

    const transportCategories: string[] = [
        "PublicTransport",
        "RideHailing",
        "Parking",
        "Toll"
    ]

    const fuelItems = transportationExpenses.filter((item) => item.category === "Fuel")
    const transportItems = transportationExpenses.filter((item) => transportCategories.includes(item.category))
    const vehicleMaintenanceItems = transportationExpenses.filter((item) => item.category === "VehicleMaintenance")

    const totalFuel = transportationExpenses.filter((item) => item.category === "Fuel").reduce((total, item) => total + item.amount, 0)
    const totalTransport = transportationExpenses
    .filter((item) => transportCategories.includes(item.category))
    .reduce((total, item) => total + item.amount, 0)
    const totalVehicleMaintenance = transportationExpenses.filter((item) => item.category === "VehicleMaintenance").reduce((total, item) => total + item.amount, 0)

    const total = totalFuel + totalTransport + totalVehicleMaintenance
    const budgetLeft = 10000 - total

    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "FUEL",
            amount: totalFuel,
            itemLength: `${fuelItems.length} ${
                fuelItems.length === 1 ? "purchase" : "purchases"
            }`
            
        },
        {
            id: 2,
            name: "TRANSPORT",
            amount: totalTransport,
            itemLength: `${transportItems.length} ${
                transportItems.length === 1 ? "trip" : "trips"
            }`
        },
        {
            id: 3,
            name: "MAINTENANCE",
            amount: totalVehicleMaintenance,
            itemLength: `${vehicleMaintenanceItems.length} ${
                vehicleMaintenanceItems.length === 1 ? "purchase" : "purchases"
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

    const TransportationColumn: TableColumn<TransportationExpense>[] = [
        {
            label: "Description",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {TransportationBillIcons[item.category].icon}
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
        setActiveSection("Transportation")
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
                            <Car size={24} className="text-[#CD7F32]"
                            />
                        </span>
                        Transportation
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
                        Track your family's transportation and travel expenses
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
            
            <div className="flex w-xl h-72 p-1 border border-[#B38B59] mb-8">
                <span
                    className="font-bold text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Transportation Breakdown 
                </span>
            </div>
            
            <div className="w-4xl h-auto py-1 px-2 border border-[#B38B59] mb-8">
                <div className="flex flex-col p-1 w-">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Transportation Bills  
                    </span>
                </div>
                <div className="block w-auto min-h-48 p-1">
                    <BillsTable
                        data={transportationExpenses}
                        columns={TransportationColumn}
                    />
                </div>
            </div>

        </section>
    )
}

export default Transportation