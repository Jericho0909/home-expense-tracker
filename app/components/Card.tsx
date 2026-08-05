interface CardProps {
    name: string;
    money: number;
}

import { PhilippinePeso, Plus } from "lucide-react";

const Card = ({ name, money }: CardProps) => {
    return (
        <div className="flex justify-start flex-col p-1 border border-[#B38B59] w-full h-24">
            <span
                className="font-bold text-[#3B2416] text-base"
                style={{ fontFamily: "var(--font-cinzel)"}}
            >
                {name}
            </span>
            <span
                className="flex items-center gap-1 text-[#964B00] text-lg"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                <PhilippinePeso size={16}/>
                {money.toLocaleString("en-US")}
            </span>
            <button
                type="button"
                className="add-button flex items-center justify-center gap-1 px-2 py-1 mt-2 text-sm font-semibold text-white rounded"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                <Plus size={16}/>
                Add
            </button>
        </div>
    )
}

export default Card