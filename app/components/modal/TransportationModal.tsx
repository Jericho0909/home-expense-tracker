'use client'

import { useState } from "react";
import type { TransportationExpense, TransportationCategory } from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";

type TransportationExpenseForm = Omit<TransportationExpense, "category" > & {
    category: TransportationCategory | "";
}

const TransportationModal = () => {
    const defaultData: TransportationExpenseForm = {
        id: 0,
        expense: "Transportation",
        amount: 0,
        createdAt: "",
        category: "",
        name: "",
        purchaseDate: ""
    }

    const [ transportationExpenses, setTransportationExpenses ] = useState<TransportationExpenseForm>(defaultData)

    return (
        <form 
            className="flex flex-col"
            
        >
            <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                <label
                    htmlFor="name"
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Name:
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={transportationExpenses.name}
                    onChange={(e) => setTransportationExpenses((item) => ({
                        ...item,
                        [e.target.name]: capitalizeFirstLetter(e.target.value)

                    }))}
                    className="no-spinner bg-[#F1E3D0] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                    placeholder=""
                    required
                />
            </div>
        </form>
    )
}

export default TransportationModal