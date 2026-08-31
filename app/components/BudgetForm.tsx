'use client'

import { useState } from 'react';

import { Lightbulb,
    CookingPot,
    Car,
    Heart,
    Hammer,
    HouseHeart,
    ReceiptText,
} from 'lucide-react';

type BudgetFormTypes = {
    utilitiesBudget: number;
    foodAndHouseBudget: number;
    transportationBudget: number;
    healthBudget: number;
    houseMaintenanceBudget: number;
    familyExpenses: number;
    otherExpenses: number;
}

const BudgetForm = () => {
    const defaultData = {
        utilitiesBudget: 0,
        foodAndHouseBudget: 0,
        transportationBudget: 0,
        healthBudget: 0,
        houseMaintenanceBudget: 0,
        familyExpenses: 0,
        otherExpenses: 0
    }

    const [ budgetForm, setBudgetForm ] = useState<BudgetFormTypes>(defaultData)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/budget", {
            method: "POST",
            body: JSON.stringify(budgetForm),
        });


        return response
    }

    return (
        <form 
            className="flex justify-center w-full p-4"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center border border-[#B38B59] rounded-lg p-4">
                <h3 
                    className="flex text-lg font-bold mb-3 text-[#3B2416] border-b-2 border-black w-full"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    The Budget
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-7">
                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Utilities-Budget" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Lightbulb 
                                    size={24} 
                                    className="text-[#F4C430]"
                                />
                            </span>
                            Utilities:
                        </label>

                        <input
                            id="Utilities-Budget"
                            type="number"
                            name="utilitiesBudget"
                            min="0"
                            step="0.01"
                            value={budgetForm.utilitiesBudget || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Food-and-House" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <CookingPot 
                                    size={24} 
                                    className="text-[#B87333]"
                                />
                            </span>
                            Food and House:
                        </label>

                        <input
                            id="Food-and-House"
                            type="number"
                            name="foodAndHouseBudget"
                            min="0"
                            step="0.01"
                            value={budgetForm.foodAndHouseBudget || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Transportation" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Car 
                                    size={24} 
                                    className="text-[#CD7F32]"
                                />
                            </span>
                            Transportation:
                        </label>

                        <input
                            id="Transportation"
                            type="number"
                            name="transportationBudget"
                            min="0"
                            step="0.01"
                            value={budgetForm.transportationBudget || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Health" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Heart
                                    size={24} 
                                    className="text-[#D8A7A7]"
                                />
                            </span>
                            Health:
                        </label>

                        <input
                            id="Health"
                            type="number"
                            name="healthBudget"
                            min="0"
                            step="0.01"
                            value={budgetForm.healthBudget || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="House-Maintenance" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Hammer
                                    size={24} 
                                    className="text-[#B8B0A5]"
                                />
                            </span>
                            House Maintenance:
                        </label>

                        <input
                            id="House-Maintenance"
                            type="number"
                            name="houseMaintenanceBudget"
                            min="0"
                            step="0.01"
                            value={budgetForm.houseMaintenanceBudget || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Family-Expenses" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <HouseHeart
                                    size={24} 
                                    className="text-[#E3B778]"
                                />
                            </span>
                            Family Expenses:
                        </label>

                        <input
                            id="Family-Expenses"
                            type="number"
                            name="familyExpenses"
                            min="0"
                            step="0.01"
                            value={budgetForm.familyExpenses || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Other-Expenses" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <ReceiptText
                                    size={24} 
                                    className="text-[#A89F91]"
                                />
                            </span>
                            Other Expenses:
                        </label>

                        <input
                            id="Other-Expenses"
                            type="number"
                            name="otherExpenses"
                            min="0"
                            step="0.01"
                            value={budgetForm.otherExpenses || ""}
                            onChange={(e) => setBudgetForm((item) => ({
                                ...item,
                                [e.target.name]: Number(e.target.value)

                            }))}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="form-btn flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#F5F5DC] bg-[#964B00] rounded-lg shadow-md cursor-pointer w-1/4 transition-all duration-300"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    Save Budget
                </button>
            </div>
        </form>
    )
}

export default BudgetForm;