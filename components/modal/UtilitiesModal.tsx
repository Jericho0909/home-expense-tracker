'use client'

import { useState, useContext, useEffect } from "react"
import ExpensesDataContext from "@/context/expensesDataContext"
import ModalContext from "@/context/modalContext";
import ModalFormButton from "../ModalFormButton";
import type { UtilitiesNames, 
    UtilityExpense, 
    StatusType ,
    PaymentMethod
} from "@/type/model"
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

type UtilityExpenseForm = Omit<UtilityExpense, "name" | "status" | "paymentMethod"> & {
    name: UtilitiesNames | "";
    status: StatusType | "";
    paymentMethod?: PaymentMethod | "" 

}

const UtilitiesModal = ({id}: {id?: string | null}) => {
    const { utilitiesExpenses } = useContext(ExpensesDataContext)!
    const { isEditing } = useContext(ModalContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const findExpenses = utilitiesExpenses.find((key) => key.id === id)
    
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

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            setIsSendingData(true)
            const response = await fetch("/api/expenses/Utilities", {
                method: "POST",
                body: JSON.stringify(utilityExpense),
            })

            if(!response.ok){
                throw new Error(
                    `Failed to create utility expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            setUtilityExpense(defaultData)
            toast.success("Successfully saved!")

        }catch(error) {
            toast.error("Failed to save expense.")
            console.error("Error creating utility expense:", error)
        }finally{
            setIsSendingData(false)
        }
    }

    const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            setIsSendingData(true)
            const response = await fetch(`
                /api/expenses/Utilities/editUtilities/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(utilityExpense),
                }

            )

            if(!response.ok){
                throw new Error(
                    `Failed to edit utility expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            toast.success("Utility bill edited successfully!")
        }catch(error){
            toast.error("Failed to edit utility bill.")
            console.error("Error edit utility expense:", error)
        }finally{
            setIsSendingData(false)
        }
    }

    const handleCancel = () => {
        setUtilityExpense(findExpenses ?? defaultData)
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
                    {isEditing 
                        ? "Edit Utility Bill" 
                        : "Add Utility Bill"
                    } 
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    {isEditing 
                        ? "Edit the details of this utility expense" 
                        : "Record a new household utility expense"
                    } 
                </span>
            </div>
            <form 
                className="flex flex-col relative "
                onSubmit={isEditing ? handleEdit : handleSubmit}
            >
                <div className={isSendingData ? "blur-[1px]" : ""}>
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
                            required
                        >
                            <option value="" disabled className="cursor-pointer">
                                Select status
                            </option>
                            {UtilitiesStatus.map((status) => (
                                <option 
                                    key={status}
                                    value={status}
                                >
                                    {status}
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

                    {utilityExpense.status === "Paid" && (
                        <div className="flex flex-col justify-between p-1 mb-3">
                            <label
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-playfair-display)"
                                }}
                            >
                                Payment Method:
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
                                            [e.target.name]: e.target.value
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
                                            [e.target.name]: e.target.value
                                        }))}
                                    />
                                    <span
                                        className="text-[#3B2416] text-sm"
                                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                                    > 
                                        GCash
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="BankTransfer"
                                        checked={utilityExpense.paymentMethod === "BankTransfer"}
                                        onChange={(e) => setUtilityExpense((item) => ({
                                            ...item,
                                            [e.target.name]: e.target.value
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
                                            [e.target.name]: e.target.value
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
                                            [e.target.name]: e.target.value
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
                    )}

                    {["Electricity", "Water", "Internet"].includes(utilityExpense.name) && (
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
                                        value={utilityExpense.billingStart?.split("T")[0] || ""}
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
                                        value={utilityExpense.billingEnd?.split("T")[0] || ""}
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
                    )}

                    {["Electricity", "Water", "Internet"].includes(utilityExpense.name) && (
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
                                value={utilityExpense.dueDate?.split("T")[0] || ""}
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
                    )}


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
                            spellCheck={false}
                        />
                    </div>

                    <ModalFormButton
                        handleCancel={handleCancel}
                    />
                </div>
                
                {isSendingData && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#F1E3D0]/60">
                        <div className="loader3">

                        </div>
                    </div>
                )}
            </form>
        </>
    )
}

export default UtilitiesModal