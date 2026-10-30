'use client'

import { useState, useEffect, useContext } from "react";
import FamilyMemberContext from "@/context/familyMemberContext";
import BudgetContext from "@/context/budgetContext";
import { FamilyRoleColor } from "@/constant/billIcons";
import type { Member,
    ExpenseBudget,
    ExpenseCategory
} from "@/type/model";
import { User, 
    PhilippinePeso,
    Wallet 
} from 'lucide-react';
import { toast } from "sonner";

type ExpenseBudgetForm = Omit<ExpenseBudget, "category"> & {
    category: ExpenseCategory | ""
}

type CategoryExpense = 
    | "Utilities"
    | "FoodAndHousehold"
    | "Transportation"
    | "Health"
    | "HouseMaintenance"
    | "FamilyExpenses"
    | "OtherExpenses"

const ContributionBudgetModal = ({id}: {id?: number | string | null}) => {
    const { familyMembers } = useContext(FamilyMemberContext)!
    const { budget } = useContext(BudgetContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const [ addMoney, setAddMoney ] = useState<number>(0)
    const [ category, setCategory ] = useState<CategoryExpense | null>(null)

    const findMember = familyMembers.find((key) => key.id === id)
    if(!findMember) return

    const [ member, ] = useState<Member>(findMember)
    const defaultExpense: ExpenseBudgetForm = {
        id: "",
        category: "",
        month: 0,
        year: 0,
        amount: 0,
        createdAt: "",
        updatedAt: "",
    }
    
    const [ expensesBudget, setExpensesBudget ] = useState<ExpenseBudgetForm> (defaultExpense)
    const [ currentlyMoney,  ] = useState<number>(member.money)

    const Category: CategoryExpense[] = [
        "Utilities",
        "FoodAndHousehold",
        "Transportation",
        "Health",
        "HouseMaintenance",
        "FamilyExpenses",
        "OtherExpenses"
    ]

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

        const updatedMember = {
            ...member,
            money: member.money + addMoney,
        }

        const updatedExpensesBudget = {
            ...expensesBudget,
            amount: expensesBudget.amount + addMoney,
        }

        try {
            setIsSendingData(true);

            const [ memberResponse, budgetResponse ] = await Promise.all([
                fetch(`/api/familyMembers/editFamilyMember/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedMember),
                }),

                fetch(`/api/budget/${expensesBudget.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedExpensesBudget),
                }),
            ]);

            if (!memberResponse.ok || !budgetResponse.ok) {
                throw new Error("Failed to update member or budget.")
            }

            toast.success("Successfully added contribution!")
            setAddMoney(0)
            setCategory(null)
        } catch (error) {
            toast.error("Failed to add contribution.")
            console.error("Error adding contribution:", error)
        } finally {
            setIsSendingData(false);
        }
    }

    useEffect(() => {
        const findExpense = budget.find((key) => key.category === category)
        if(!findExpense) return

        setExpensesBudget(findExpense)
    }, [ category ])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500)

        return () => clearTimeout(timer)
    }, [])

    if(isLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-auto h-20">
                <div className="loader2">

                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-3">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <User size={24} color="black" fill={`${FamilyRoleColor[member?.familyRole]}`}/>
                    </span>
                    {member?.name}
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Household contribution 
                </span>
            </div>

            <div className="flex justify-between flex-col px-1 py-5">
                <span 
                    className="text-base font-semibold mb-5"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    Current Contribution 
                </span>
                <span 
                    className="flex items-center justify-center text-sm text-[#3B2416]"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    <PhilippinePeso size={16}/>
                    {currentlyMoney.toLocaleString("en-US")}
                </span>
            </div>

            <div className="flex flex-col justify-center w-full mb-8">
                <div className="flex flex-col    p-4 bg-[#F5F0E6] border border-[#B38B59] rounded-lg">
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
                        onSubmit={handleSubmit}
                    >
                        <div className={isSendingData ? "blur-[1px]" : ""}>
                            <div className="flex items-center justify-center mb-2 p-1 w-full">
                                <label
                                    htmlFor="expenses"
                                    className="text-base font-semibold w-20 text-start"
                                    style={{
                                        fontFamily: "var(--font-playfair-display)"
                                    }}
                                >
                                    Expenses:
                                </label>

                                <select
                                    id="expenses"
                                    name="category"
                                    value={category || ""}
                                    onChange={(e) => setCategory(e.target.  value as CategoryExpense)
                                    }
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

                            <div className="flex items-center justify-center mb-2 p-1">
                                <label
                                    htmlFor="amount"
                                    className="text-base font-semibold w-20 text-start"
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
                                    value={addMoney || ""}
                                    onChange={(e) => setAddMoney(Number(e.target.value))}
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

                            {category !== null && (
                                <div className="flex items-center justify-center flex-col p-1 w-full">
                                    <span 
                                        className="text-base font-semibold"
                                        style={{fontFamily: "var(--font-playfair-display)"}}
                                    >
                                        Current Budget
                                    </span>
                                    <span 
                                        className="flex items-center justify-center text-sm text-[#3B2416]"
                                        style={{
                                            fontFamily: "var(--font-libre-baskerville)"
                                        }}
                                    >
                                        <PhilippinePeso size={16}/>
                                        {Number(expensesBudget.amount).toLocaleString("en-US")} 
                                    </span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="save-btn w-full rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                            >
                                Save
                            </button>
                        </div>

                        {isSendingData && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#F1E3D0]/60">
                                <div className="loader3">

                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default ContributionBudgetModal