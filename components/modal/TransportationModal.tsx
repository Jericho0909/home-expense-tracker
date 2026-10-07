'use client'

import { useState, useContext ,useEffect } from "react";
import ExpensesDataContext from "@/context/expensesDataContext";
import ModalContext from "@/context/modalContext";
import ModalFormButton from "../ModalFormButton";
import type { TransportationExpense, 
    TransportationCategory,
    PaymentMethod
} from "@/type/model"
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Car } from 'lucide-react';
import { toast } from "sonner";

type TransportationExpenseForm = Omit<TransportationExpense, "category"| "paymentMethod" > & {
    category: TransportationCategory | "";
    paymentMethod: PaymentMethod | ""
}

const TransportationModal = ({id}: {id?: string | null}) => {
    const { transportationExpenses } = useContext(ExpensesDataContext)!
    const { isEditing } = useContext(ModalContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const findExpenses = transportationExpenses.find((key) => key.id === id)
    const defaultData: TransportationExpenseForm = {
        id: "0",
        expense: "Transportation",
        amount: 0,
        createdAt: "",
        description: "",
        category: "",
        date: "",
        paymentMethod: "",
        notes: ""
    }

    const [ transportationExpense, setTransportationExpense ] = useState<TransportationExpenseForm>(findExpenses ?? defaultData)

    const TransportationCategory: TransportationCategory[] = [
        "Fuel",
        "PublicTransport",
        "RideHailing",
        "Parking",
        "Toll",
        "VehicleMaintenance",
    ]

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            setIsSendingData(true)
            const response = await fetch("/api/expenses/Transportation", {
                method: "POST",
                body: JSON.stringify(transportationExpense),
            })

            if(!response.ok){
                const errorText = await response.text()


                throw new Error(
                    `Failed to create transportation expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            setTransportationExpense(defaultData)
            toast.success("Successfully saved!")

        }catch(error) {
            toast.error("Failed to save expense.")
            console.error("Error creating transpotation expense:", error)
        }finally{
            setIsSendingData(false)
        }

    }

    const handleEdit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
            setIsSendingData(true)
        try {
            const response = await fetch(`
                /api/expenses/Transportation/editTransportation/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(transportationExpense),
                }
            )

            if(!response.ok){
                throw new Error(
                    `Failed to edit transportation expense: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            toast.success("Trasportation bill edited successfully!")
        }catch(error){
            toast.error("Failed to edit transportation bill.")
            console.error("Error edit transportation expense:", error)
        }finally{
            setIsSendingData(false)
        }
    }

    const handleCancel = () => {
        setTransportationExpense(findExpenses ?? defaultData)
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
                        <Car size={24} className="text-[#CD7F32]"
                    />
                    </span>
                    {isEditing
                        ? "Edit Transportation Expense"
                        : "Add Transportation Expense"
                    }
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    {isEditing
                        ? "Edit the details of this transportation expense"
                        : "Record a transportation expense "
                    }
                </span>
            </div>
            <form 
            className="flex flex-col relative"
                onSubmit={isEditing ? handleEdit : handleSubmit}
            >
                <div className={isSendingData ? "blur-[1px]" : ""}>
                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="category"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Category:
                        </label>
                        <select
                            id="category"
                            value={transportationExpense.category}
                            onChange={(e) =>
                                setTransportationExpense((item) => ({
                                    ...item,
                                    category: e.target.value as TransportationCategory
                                }))
                            }
                            className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F1E3D0] px-3 py-2 text-sm text-[#5C4033] outline-none"
                            style={{
                                fontFamily: "var(--font-libre-baskerville)"
                            }}
                        >
                            <option value="" disabled>
                                Select Category
                            </option>

                            {[...TransportationCategory].sort((a, b) => a.localeCompare(b)).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="description"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Description:
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={transportationExpense.description}
                            onChange={(e) => setTransportationExpense((item) => ({
                                ...item,
                                [e.target.name]: capitalizeFirstLetter(e.target.value)

                            }))}
                            className="no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
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
                            value={transportationExpense.amount || ""}
                            onChange={(e) => setTransportationExpense((item) => ({
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
                            Payment Method:
                        </label>

                        <div className="flex flex-wrap gap-4">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash"
                                    checked={transportationExpense.paymentMethod === "Cash"}
                                    onChange={(e) => setTransportationExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
                                    }))}
                                    required
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
                                    checked={transportationExpense.paymentMethod === "GCash"}
                                    onChange={(e) => setTransportationExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
                                    }))}
                                    required
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
                                    checked={transportationExpense.paymentMethod === "BankTransfer"}
                                    onChange={(e) => setTransportationExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
                                    }))}
                                    required
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
                                    checked={transportationExpense.paymentMethod === "Maya"}
                                    onChange={(e) => setTransportationExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
                                    }))}
                                    required
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
                                    checked={transportationExpense.paymentMethod === "Other"}
                                    onChange={(e) => setTransportationExpense((item) => ({
                                        ...item,
                                        [e.target.name]: e.target.value
                                    }))}
                                    required
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

                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="date"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Date:
                        </label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={transportationExpense.date.split("T")[0]}
                            onChange={(e) => setTransportationExpense((item) => ({
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
                            value={transportationExpense.notes}
                            onChange={(e) => setTransportationExpense((item) => ({
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

export default TransportationModal