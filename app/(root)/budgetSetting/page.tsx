'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext";
import Card from "@/app/components/Card";
import { MembersData } from "@/app/constant/expensesData";
import { HandCoins } from 'lucide-react';

const BudgerSettingPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })
    

    useEffect(() => {
        setActiveSection("BudgetSetting")
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
                            <HandCoins size={24} className="text-[#964B00]"
                            />
                        </span>
                        Household Budget
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
                        Manage family contributions and expenses
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2 w-4xl h-auto mb-8">
                {MembersData.map((member) => (
                    <Card
                        key={member.id}
                        name={member.name}
                        money={member.money}
                    />
                ))}
            </div>
        </section>
    )
}

export default BudgerSettingPage