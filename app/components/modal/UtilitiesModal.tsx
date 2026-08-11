'use client'

import { useState } from "react"
import type { UtilitiesNames, 
    UtilityExpense, 
    StatusType 
} from "@/app/type/model"

const UtilitiesModal = () => {
    const [ utilityExpense, setUtilityExpense ] = useState<UtilityExpense>({
        id: 0,
        expense: "Utilities",
        amount: 0,
        createdAt: "",
        name: "Electricity",
        billingStart: "",
        billingEnd: "",
        dueDate: "",
        status: "Pending"
    })

    const UtilitiesSelection: UtilitiesNames[] = [
        "Electricity",
        "Water",
        "Internet",
        "MineralWater",
        "MobileLoad",
        "CookingGas"
    ]

    const UtilitiesStatus: StatusType[] = [
        "Paid",
        "Pending",
        "Overdue",
        "Unpaid"
    ]

    const handleCancel = () => {
        console.log("Cancle")
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(utilityExpense)
    }
    return (
        <form 
            className="flex flex-col"
            onSubmit={handleSubmit}
        >
            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="utility"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Utility:
                </label>
                <select
                    id="utility"
                    defaultValue=""
                    onChange={(e) => setUtilityExpense((item) => ({
                        ...item,
                        name: e.target.value as UtilitiesNames
                    }))}
                    className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                    style={{fontFamily: "var(--font-libre-baskerville)"}}
                >
                    <option value="" disabled className="cursor-pointer">
                        Select utility
                    </option>
                    {UtilitiesSelection.map((names) => (
                        <option 
                            key={names}
                            value={names}
                        >
                            {names}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="amount"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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
                    value={utilityExpense.amount || ""}
                    onChange={(e) => setUtilityExpense((item) => ({
                        ...item,
                        [e.target.name]: Number(e.target.value)

                    }))}
                    onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className="no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    placeholder=""
                    required
                />
            </div>

            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="billingStart"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Billing Start:
                </label>
                <input
                    id="billingStart"
                    type="date"
                    name="billingStart"
                    value={utilityExpense.billingStart}
                    onChange={(e) => setUtilityExpense((item) => ({
                        ...item,
                        [e.target.name]: e.target.value

                    }))}
                    className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    placeholder=""
                    required
                />
            </div>

            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="billingEnd"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Billing End:
                </label>
                <input
                    id="billingEnd"
                    type="date"
                    name="billingEnd"
                    value={utilityExpense.billingEnd}
                    onChange={(e) => setUtilityExpense((item) => ({
                        ...item,
                        [e.target.name]: e.target.value

                    }))}
                    className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    placeholder=""
                    required
                />
            </div>

            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="dueDate"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Due Date:
                </label>
                <input
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    value={utilityExpense.dueDate}
                    onChange={(e) => setUtilityExpense((item) => ({
                        ...item,
                        [e.target.name]: e.target.value

                    }))}
                    className="bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    placeholder=""
                    required
                />
            </div>

            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="utility"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Status:
                </label>
                <select
                    id="utility"
                    defaultValue=""
                    onChange={(e) => setUtilityExpense((item) => ({
                        ...item,
                        status: e.target.value as StatusType
                    }))}
                    className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                    style={{fontFamily: "var(--font-libre-baskerville)"}}
                >
                    <option value="" disabled className="cursor-pointer">
                        Select status
                    </option>
                    {UtilitiesStatus.map((names) => (
                        <option 
                            key={names}
                            value={names}
                        >
                            {names}
                        </option>
                    ))}
                </select>
            </div>

            <div 
                className="flex items-center justify-end w-full gap-2"
                style={{
                    fontFamily: "var(--font-libre-baskerville)"
                }}
            >
                <button
                    type="button"
                    className="cancel-btn rounded-md border border-[#8B5E3C] bg-[#E6D2B5] px-4 py-2 text-sm font-semibold text-[#5C4033] cursor-pointer transition-all duration-150 ease-in-out"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="savebill-btn rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                >
                    Save Bill
                </button>
            </div>
        </form>
    )
}

export default UtilitiesModal