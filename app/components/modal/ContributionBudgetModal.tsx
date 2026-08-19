import { MembersData } from "@/app/constant/expensesData"
import { User } from 'lucide-react';

const ContributionBudget = ({id}: {id?: number | string | null}) => {
    const member = MembersData.find((key) => key.id === id)
    console.log(member)

    return (
        <div className="flex flex-col">
            <h4 
                className="flex text-lg font-bold mb-3 text-[#3B2416]"
                style={{ fontFamily: "var(--font-cinzel)"}}
            >
                <span className="mr-2">
                    <User size={24} className="text-[#F4C430]"
                    />
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
    )
}

export default ContributionBudget