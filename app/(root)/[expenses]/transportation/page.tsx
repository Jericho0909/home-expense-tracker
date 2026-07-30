'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import ButtonModal from "@/app/components/ButtonModal"
import SummaryCards from "@/app/components/SummaryCard"
import { Car,
    PhilippinePeso, 
} from 'lucide-react';
import { TransportationData } from "@/app/constant/expensesData"

type SummaryType = {
    id: string | number;
    name: string;
    amount?: number,
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

    const transportationCategories: string[] = [
        "PublicTransport",
        "RideHailing",
        "Parking",
        "Toll"
    ]

    const totalFuel = transportationExpenses.filter((item) => item.category === "Fuel").reduce((total, item) => total + item.amount, 0)

    const totalTransport = transportationExpenses
    .filter((item) => transportationCategories.includes(item.category))
    .reduce((total, item) => total + item.amount, 0)

    const totalVehicleMaintenance = transportationExpenses.filter((item) => item.category === "VehicleMaintenance").reduce((total, item) => total + item.amount, 0)

    const total = totalFuel + totalTransport + totalVehicleMaintenance
    const budget = total - 10000

    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "FUEL",
            amount: totalFuel
            
        },
        {
            id: 2,
            name: "TRANSPORT",
            amount: totalTransport
            
        },
        {
            id: 3,
            name: "MAINTENANCE",
            amount: totalVehicleMaintenance
            
        },
        {
            id: 4,
            name: "THIS MONTH",
            total: total
            
        },
        {
            id: 5,
            name: "BUDGET LEFT",
            budget: budget
        },
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

            <div className="grid grid-cols-4 gap-2 w-2xl h-auto mb-8">
                {SummaryDataArr.map((item, index) => (
                    <SummaryCards
                        key={index}
                        title={item.name}
                        content={
                            <div 
                                className="block text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                <p 
                                        className="flex text-sm flex-wrap"
                                        style={{ fontFamily: "var(--font-libre-baskerville)"}}
                                    >
                                        <span
                                            className="flex items-center gap-1 mr-1"
                                        >
                                            <PhilippinePeso
                                                size={16}
                                            /> 
                                            
                                        </span> 
                                        of 
                                        <span
                                            className="flex items-center gap-1 ml-1"
                                        >
                                            <PhilippinePeso
                                                size={16}
                                            /> 
                                            
                                        </span> 
                                </p>
                            </div>
                        }
                    />
                ))}
            </div>

        </section>
    )
}

export default Transportation