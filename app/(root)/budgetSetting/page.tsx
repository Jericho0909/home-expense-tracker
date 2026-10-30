'use client'

import { useContext, useEffect, useState } from "react"
import ExpensesSectionContext from "@/context/expensesSectionContext";
import FamilyMemberContext from "@/context/familyMemberContext";
import BudgetContext from "@/context/budgetContext";
import ModalContext from "@/context/modalContext";
import Card from "@/components/Card";
import AddMemberModal from "@/components/modal/AddMemberModal";
import Table from "@/components/Table";
import type { TableColumn, 
    Member,
    ExpensesBudgetSummaryType,
} from "@/type/model";
import { FamilyRoleColor } from "@/constant/billIcons";
import { HandCoins, 
    PhilippinePeso, 
    User,
    Plus,
} from 'lucide-react';

const BudgerSettingPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const { setIsOpen, setActiveModal } = useContext(ModalContext)!
    const { familyMembers } = useContext(FamilyMemberContext)!
    const { budget } = useContext(BudgetContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const MemberColumn: TableColumn<Member>[] = [
        {
            label: "Name",
            render: (item) => 
                <span className="flex items-center gap-1">
                    <User size={16} color="black" fill={`${FamilyRoleColor[item.familyRole]}`}/>
                    {item.name}
                </span>
        },
        {
            label: "Family Role",
            render: (item) => 
                <span className="flex items-center gap-1">
                    {item.familyRole}
                </span>
        }
    ]

    const ExpensesBudgetSummary: ExpensesBudgetSummaryType[] = [
        { category: "Utilities", amount: 0 },
        { category: "FoodAndHousehold", amount: 0 },
        { category: "Transportation", amount: 0 },
        { category: "Health", amount: 0 },
        { category: "HouseMaintenance", amount: 0 },
        { category: "FamilyExpenses", amount: 0 },
        { category: "OtherExpenses", amount: 0 }
    ].map((item) => ({
        ...item,
        amount: Number(
            budget.find((b) => b.category === item.category)?.amount ?? 0
        )
    }))

    const totalBudget = ExpensesBudgetSummary.reduce(
        (total, item) => total + item.amount,
        0
    )


    const OpenModal = () => {
        setIsOpen(true)
        setActiveModal(<AddMemberModal id={null}/>)
    }

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
                {familyMembers.map((member) => (
                    <Card
                        key={member.id}
                        member={member}
                    />
                ))}
                <button
                    type="button"
                    onClick={OpenModal}
                    className="add-member-btn flex flex-col items-center justify-center font-bold text-[#3B2416] text-base bg-[#F5F0E6] border border-[#B38B59] rounded-lg  cursor-pointer transition-all ease-in-out duration-75"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <Plus
                        size={24}
                        color="black"
                        fill="black"
                    />
                    Add Member
                </button>
            </div>

            <div className="w-full h-auto py-1 px-2 bg-[#F5F0E6] border border-[#B38B59] rounded-lg mb-8">
                <span
                    className="font-bold text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Family Members  
                </span>

                <div className="flex border-b-2 border-black w-full mt-3">

                </div>
            
                <div className="block w-auto min-h-48 p-1">
                    <Table
                        data={familyMembers}
                        columns={MemberColumn}
                        viewLink="/budgetSetting/viewMember"
                        editLink ="/budgetSetting/editMember"
                        delLink="/budgetSetting/deleteFamilyMember"
                    />
                </div>
            </div>

            <div className="block w-full h-auto p-2 bg-[#F5F0E6] border border-[#B38B59] rounded-lg">
                <div className="block mb-2">
                    <p 
                        className=" text-lg font-bold mb-1 text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Monthly Budget Settings
                    </p>

                    <span
                        className="text-base italic text-[#8B5E3C]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Budget period: {currentDate}
                    </span>
                </div>

                <div className="flex flex-col p-2 border-y-2 border-black">
                    {ExpensesBudgetSummary.map((item) => (
                        <div 
                            key={item.category}
                            className="flex items-center justify-around w-full p-2">
                            <span className="flex-1">
                                {item.category}
                            </span>
                            <span className="flex items-center justify-center flex-1">
                                <PhilippinePeso
                                    size={16}
                                />
                                {item.amount?.toLocaleString("en-US")}
                            
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center p-2 w-full">
                    <div className="flex flex-col flex-1 py-2">
                        <span
                            className="text-base"
                            style={{ fontFamily: "var(--font-cinzel)"}}
                        >
                            Total Monthly Budget
                        </span>

                        <span
                            className="text-[12px] italic text-[#8B5E3C]"
                            style={{ fontFamily: "var(--font-cinzel)"}}
                        >
                            Illustrative example only
                        </span>
                    </div>
                    <div className="flex justify-center flex-1">
                        <span className="text-2xl flex items-center">
                            <PhilippinePeso
                                size={24}
                            />
                            {totalBudget.toLocaleString("en-US")}
                        </span>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default BudgerSettingPage