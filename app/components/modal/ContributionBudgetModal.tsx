'use client'

import { useState, useEffect } from "react";
import { MembersData } from "@/app/constant/expensesData"
import { FamilyRoleColor } from "@/app/constant/billIcons";
import type { Member } from "@/app/type/model";
import { User, PhilippinePeso } from 'lucide-react';

const ContributionBudgetModal = ({id}: {id?: number | string | null}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const findMember = MembersData.find((key) => key.id === id)
    if(!findMember) return

    const [ member,  ] = useState<Member>(findMember)
    const [ addMoney, setAddMoney ] = useState<number>(0)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

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
                    <PhilippinePeso size={18}/>
                    {member.money.toLocaleString("en-US")}
                </span>
            </div>
            <form 
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                    <label
                        htmlFor="money"
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Add Money:
                    </label>
                    <input
                        id="money"
                        type="number"
                        name="money"
                        min="0"
                        step="0.01"
                        value={addMoney || ""}
                        onChange={(e) => setAddMoney(Number(e.target.value))}
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        className="no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        placeholder="1000"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="add-money-btn rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                >
                    Add Money
                </button>
            </form>
        </div>
    )
}

export default ContributionBudgetModal