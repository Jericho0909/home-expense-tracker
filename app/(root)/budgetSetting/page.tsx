'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/context/expensesSectionContext";
import FamilyMemberContext from "@/context/familyMemberContext";
import ModalContext from "@/context/modalContext";
import Card from "@/components/Card";
import AddMemberModal from "@/components/modal/AddMemberModal";
import Table from "@/components/Table";
import BudgetForm from "@/components/BudgetForm";
import type { TableColumn, 
    Member,
    ExpensesBudgetSummaryType
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
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })


    const totalBudget = familyMembers.reduce((total, member) => total + member.money, 0)

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

    const ExpensesBudgetSummary: ExpensesBudgetSummaryType[] =[
        {
            title: "Utilities",
            amount: 1000
        },
        {
            title: "Food and Household",
            amount: 1000
        },
        {
            title: "Transportation",
            amount: 1000
        },
        {
            title: "Health",
            amount: 1000
        },
        {
            title: "House Maintenance",
            amount: 1000
        },
        {
            title: "Family Expenses",
            amount: 1000
        },
        {
            title: "Other Expenses",
            amount: 1000
        }
    ]

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
                <div className="flex justify-start flex-col p-1 border border-[#B38B59] w-full ">
                    <span
                        className="font-bold text-[#3B2416] text-base"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        TOTAL FAMILY BUDGET
                    </span>
                    <span
                        className="flex items-center gap-1 text-[#8B5E3C] text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)"}}
                    >
                        <PhilippinePeso size={16}/>
                        {totalBudget.toLocaleString("en-US")}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={OpenModal}
                    className="add-member-btn flex flex-col items-center justify-center font-bold text-[#3B2416] text-base border cursor-pointer transition-all ease-in-out duration-75"
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

            <div className="w-4xl h-auto py-1 px-2 border border-[#B38B59] mb-8">
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

            <div className="block w-4xl h-auto p-2 border border-[#B38B59]">
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
                        <div className="flex items-center justify-around w-full p-2">
                            <span className="flex-1">
                                {item.title}
                            </span>
                            <span className="flex items-center flex-1">
                                <PhilippinePeso
                                    size={16}
                                />
                                {item.amount?.toLocaleString("en-US")}
                                {" "}
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
                            10000
                        </span>
                    </div>
                </div>

            </div>

            <BudgetForm />
        </section>
    )
}

export default BudgerSettingPage