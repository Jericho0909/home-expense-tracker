'use client'

import { useContext } from "react";
import ModalContext from "../context/modalContext";
import { HandCoins, PhilippinePeso, Plus } from "lucide-react";

interface CardProps {
    name: string;
    money: number;
}


const Card = ({ name, money }: CardProps) => {
    const { setIsOpen, setModalTitle, setActiveModal } = useContext(ModalContext)!

    const openModal = () => {
        setIsOpen(true)
        setModalTitle(
            <>
                <span className="mr-2">
                    <HandCoins size={24} className="text-[#964B00]"
                    />
                </span>
                Household contribution
            </>
        )
        setActiveModal("BudgetSetting")
    }
    return (
        <div className="flex justify-start flex-col p-1 border border-[#B38B59] w-full ">
            <span
                className="font-bold text-[#3B2416] text-base"
                style={{ fontFamily: "var(--font-cinzel)"}}
            >
                {name}
            </span>
            <span
                className="flex items-center gap-1 text-[#8B5E3C] text-sm"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                <PhilippinePeso size={16}/>
                {money.toLocaleString("en-US")}
            </span>
            <button
                type="button"
                onClick={openModal}
                className="add-button flex items-center justify-center gap-1 px-2 py-1 mt-2 text-sm font-semibold  rounded cursor-pointer"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                <Plus size={16}/>
                Add
            </button>
        </div>
    )
}

export default Card