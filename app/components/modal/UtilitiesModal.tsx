'use client'

import { useState } from "react"
import ModalFormButton from "../ModalFormButton";
import { UtilitiesData } from "@/app/constant/expensesData";
import type { UtilitiesNames, 
    UtilityExpense, 
    StatusType ,
    PaymentMethod
} from "@/app/type/model"
import { Lightbulb } from "lucide-react";

type UtilityExpenseForm = Omit<UtilityExpense, "name" | "status" | "paymentMethod"> & {
    name: UtilitiesNames | "";
    status: StatusType | "";
    paymentMethod?: PaymentMethod | ""

}

const UtilitiesModal = ({id}: {id?: string | null}) => {
    const findExpenses = UtilitiesData.find((key) => key.id === id)
    
    const defaultData: UtilityExpenseForm = {
        id: "0",
        expense: "Utilities",
        amount: 0,
        createdAt: "",
        name: "",
        billingStart: "",
        billingEnd: "",
        dueDate: "",
        status: "",
        paymentMethod: "",
        paidAt: "",
        notes: ""

    }

   const [ utilityExpense, setUtilityExpense ] = useState<UtilityExpenseForm>(findExpenses ?? defaultData)

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
        setUtilityExpense(defaultData)
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

    }
    return (
        <>
            <div className="flex flex-col border-b-2 border-black mb-4">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <Lightbulb size={24} className="text-[#F4C430]"
                        />
                    </span>
                    Add Utility Bill 
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Add a new household utility bill 
                </span>
            </div>
            <form 
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                    <label
                        htmlFor="utility"
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Utility:
                    </label>
                    <select
                        id="utility"
                        value={utilityExpense.name}
                        onChange={(e) =>
                            setUtilityExpense((item) => ({
                                ...item,
                                name: e.target.value as UtilitiesNames
                            }))
                        }
                        className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                        style={{
                            fontFamily: "var(--font-libre-baskerville)"
                        }}
                    >
                        <option value="" disabled>
                            Select utility
                        </option>

                        {UtilitiesSelection.map((names) => (
                            <option key={names} value={names}>
                                {names}
                            </option>
                        ))}
                    </select>
                </div>

                 <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                    <label
                        htmlFor="status"
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Status:
                    </label>
                    <select
                        id="status"
                        value={utilityExpense.status}
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

                <div className="flex justify-center flex-col gap-2 mb-2 p-1">
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

                <div className="flex flex-col justify-between p-1 mb-3">
                    <label
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Payment Method
                    </label>

                    <div className="flex flex-wrap gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Cash"
                                checked={utilityExpense.paymentMethod === "Cash"}
                                onChange={(e) => setUtilityExpense((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                            />
                            <span
                                className="text-[#3B2416] text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            >
                                Cash
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="GCash"
                                checked={utilityExpense.paymentMethod === "GCash"}
                                onChange={(e) => setUtilityExpense((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                            />
                            <span>GCash</span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Bank Transfer"
                                checked={utilityExpense.paymentMethod === "Bank Transfer"}
                                onChange={(e) => setUtilityExpense((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                            />
                            <span
                                className="text-[#3B2416] text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            >
                                Bank Transfer
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Maya"
                                checked={utilityExpense.paymentMethod === "Maya"}
                                onChange={(e) => setUtilityExpense((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                                
                            />
                            <span
                                className="text-[#3B2416] text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            >
                                Maya
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Other"
                                checked={utilityExpense.paymentMethod === "Other"}
                                onChange={(e) => setUtilityExpense((item) => ({
                                    ...item,
                                    [e.target.name]: Number(e.target.value)
                                }))}
                                
                            />
                            <span
                                className="text-[#3B2416] text-sm"
                                style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            >
                                Other
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-1">
                        <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                            <label
                                htmlFor="billingStart"
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
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
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                            <label
                                htmlFor="billingEnd"
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
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
                    </div>
                </div>

                <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                    <label
                        htmlFor="dueDate"
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
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
                        htmlFor="notes"
                        className="text-base font-semibold"
                        style={{
                            fontFamily: "var(--font-playfair-display)"
                        }}
                    >
                        Notes:
                    </label>
                    <textarea
                        name="notes"
                        value={utilityExpense.notes}
                        onChange={(e) => setUtilityExpense((item) => ({
                            ...item,
                            [e.target.name]: e.target.value
                        }))}
                        className="resize-none bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        placeholder="Add notes..."
                        rows={4}
                        required
                    />
                </div>

                <ModalFormButton
                    handleCancel={handleCancel}
                />
            </form>
        </>
    )
}

export default UtilitiesModal