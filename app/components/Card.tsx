'use client'

import Link from "next/link";
import { useContext } from "react";
import ModalContext from "../context/modalContext";
import { HandCoins, PhilippinePeso, Plus } from "lucide-react";

interface MemberType {
    id: string | number;
    name: string;
    money: number
}

interface CardProps {
    member: MemberType
}


const Card = ({ member }: CardProps) => {
    const { setIsOpen, setActiveModal, setIsEditing } = useContext(ModalContext)!

    const handleOpenModal = () => {
        setActiveModal(null)
        setIsOpen(true)
        setIsEditing(true)
    }
    return (
        <div className="flex justify-start flex-col p-1 border border-[#B38B59] w-full ">
            <span
                className="font-bold text-[#3B2416] text-base"
                style={{ fontFamily: "var(--font-cinzel)"}}
            >
                {member.name}
            </span>
            <span
                className="flex items-center gap-1 text-[#8B5E3C] text-sm"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                <PhilippinePeso size={16}/>
                {member.money.toLocaleString("en-US")}
            </span>
            <Link
                href={`/budgetSetting/editContribution/${member.id}`}
                onClick={handleOpenModal}
                className="add-button flex items-center justify-center gap-1 px-2 py-1 mt-2 text-sm font-semibold  rounded cursor-pointer"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                <Plus size={16}/>
                Add
            </Link>
        </div>
    )
}

export default Card