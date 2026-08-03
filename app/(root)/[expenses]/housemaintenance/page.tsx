'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext"
import { Hammer } from 'lucide-react';
import ButtonModal from "@/app/components/ButtonModal";
import SummaryCards from "@/app/components/SummaryCard";
import
import { PhilippinePeso } from 'lucide-react';

const HouseMaintenance = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const SummaryDataArr:SummaryType[] = [
        {
            id: 1,
            name: "REPAIRS",
            amount: totalMedicine,
            itemLength: `${medicineItems.length} ${
                medicineItems.length === 1 ? "purchase" : "purchases"
            }`
            
        },
        {
            id: 2,
            name: "MAINTENANCE",
            amount: totalConsultation,
            itemLength: `${consultationItems.length} ${
                consultationItems.length === 1 ? "vist" : "vits"
            }`
        },
        {
            id: 3,
            name: "CLEANING",
            amount: totalConsultation,
            itemLength: `${consultationItems.length} ${
                consultationItems.length === 1 ? "vist" : "vits"
            }`
        },
        {
            id: 3,
            name: "PEST CONTROL",
            amount: totalConsultation,
            itemLength: `${consultationItems.length} ${
                consultationItems.length === 1 ? "vist" : "vits"
            }`
        },
        {
            id: 4,
            name: "OTHER",
            amount: totalOther,
            itemLength: `${otherItems.length} ${
                otherItems.length === 1 ? "purchase" : "purchases"
            }`
        },
        {
            id: 5,
            name: "THIS MONTH",
            total: total
            
        },
        {
            id: 5,
            name: "BUDGET LEFT",
            budget: budgetLeft
        },
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
        </section>
    )
}

export default HouseMaintenance