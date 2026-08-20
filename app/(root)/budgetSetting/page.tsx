'use client'

import { useContext, useEffect } from "react"
import ExpensesSectionContext from "@/app/context/expensesSectionContext";
import ModalContext from "@/app/context/modalContext";
import Card from "@/app/components/Card";
import AddMemberModal from "@/app/components/modal/AddMemberModal";
import Table from "@/app/components/Table";
import BudgetForm from "@/app/components/BudgetForm";
import { MembersData } from "@/app/constant/expensesData";
import type { TableColumn, 
    Member 
} from "@/app/type/model";
import { FamilyRoleColor } from "@/app/constant/billIcons";
import { HandCoins, 
    PhilippinePeso, 
    User,
    Plus,
} from 'lucide-react';

const BudgerSettingPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const { setIsOpen, setActiveModal } = useContext(ModalContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    

    const totalBudget = MembersData.reduce((total, member) => total + member.money, 0)

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
                {MembersData.map((member) => (
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
                <div className="flex flex-col p-1 w-">
                    <span
                        className="font-bold text-[#3B2416]"
                        style={{ fontFamily: "var(--font-cinzel)"}}
                    >
                        Family Members  
                    </span>
                </div>
                <div className="block w-auto min-h-48 p-1">
                    <Table
                        data={MembersData}
                        columns={MemberColumn}
                        viewLink="/budgetSetting/viewMember"
                        editLink = "/budgetSetting/editMember"
                    />
                </div>
            </div>
            <BudgetForm />
        </section>
    )
}

export default BudgerSettingPage