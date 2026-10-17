'use client'

import { useContext, useEffect, useState } from "react"
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
    Wallet
} from 'lucide-react';

type CategoryExpense = 
    | "Utilities"
    | "FoodAndHousehold"
    | "Transportation"
    | "Health"
    | "HouseMaintenance"
    | "FamilyExpenses"
    | "OtherExpenses"

type ExpenseTypes = {
    id: string
    category: CategoryExpense | "";
    amount: number;
    createdAt: string
    updatedAt: string
}


const BudgerSettingPage = () => {
    const { setActiveSection } = useContext(ExpensesSectionContext)!
    const { setIsOpen, setActiveModal } = useContext(ModalContext)!
    const { familyMembers } = useContext(FamilyMemberContext)!
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const defaultExpense: ExpenseTypes = {
        id: "",
        category: "",
        amount: 0,
        createdAt: "",
        updatedAt: "",
    }

    const [ expenseBudget, setExpenseBudget ] = useState<ExpenseTypes> (defaultExpense)


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

    const ExpensesBudgetSummary: ExpensesBudgetSummaryType[] = [
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

    const Category: CategoryExpense[] = [
        "Utilities",
        "FoodAndHousehold",
        "Transportation",
        "Health",
        "HouseMaintenance",
        "FamilyExpenses",
        "OtherExpenses"
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

            <div className="block w-4xl h-auto p-2 border border-[#B38B59] mb-8">
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
                            key={item.title}
                            className="flex items-center justify-around w-full p-2">
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

            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col w-md p-4 bg-[#F5F0E6] rounded-lg">
                    <div className="flex items-center gap-1">
                        <div className="p-2 rounded-md bg-[#F1E3D0]">
                            <Wallet
                                size={32}
                                color="brown"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span
                                className="text-base"
                                style={{ fontFamily: "var(--font-cinzel)"}}
                            >
                                Set Monthly Budget
                            </span>

                            <span
                                className="text-sm italic text-[#8B5E3C]"
                                style={{ fontFamily: "var(--font-cinzel)"}}
                            >
                                Manage your household spending limits
                            </span>
                        </div>
                    </div>
                    <div className="flex border-b-2 border-black w-full mt-3">

                    </div>
                    <form
                        className="flex flex-col relative mt-3"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2 p-1 w-full">
                            <label
                                htmlFor="expenses"
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
                                }}
                            >
                                Expenses:
                            </label>

                            <select
                                id="expenses"
                                name="category"
                                value={expenseBudget.category}
                                onChange={(e) => setExpenseBudget((item) => ({
                                    ...item,
                                    [e.target.name]: e.target.value as CategoryExpense
                                }))}
                                className="flex-1 cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                                style={{fontFamily: "var(--font-libre-baskerville)"}}
                                required
                            >
                                <option 
                                    value=""
                                    className="cursor-pointer" 
                                    disabled
                                >
                                    Select expenses
                                </option>
                                {Category.map((expense) => (
                                    <option 
                                        key={expense}
                                        value={expense}
                                    >
                                        {expense}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-2 p-1">
                            <label
                                htmlFor="amount"
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
                                }}
                            >
                                Amount:
                            </label>
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                min="0"
                                step="0.01"
                                value={expenseBudget.amount || ""}
                                onChange={(e) => setExpenseBudget((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)

                                }))}
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                className="flex-1 no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                                style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                placeholder=""
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="save-btn w-full rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default BudgerSettingPage