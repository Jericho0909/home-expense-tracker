'use client'

import { useState } from 'react';
import { MembersData } from '@/app/constant/expensesData';
import type { Member } from '@/app/type/model';
import { User, PhilippinePeso } from 'lucide-react';

const ViewMemberModal = ({id}: {id?: string | null}) => {
    const findMember = MembersData.find((key) => key.id === id)
        if(!findMember) return
    
        const [ member, ] = useState<Member>(findMember)
    return(
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-3">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <User size={24} color="black" fill="black"/>
                    </span>
                    Zara Family  
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Member Details
                </span>
            </div>

            <div className="flex justify-between flex-col px-1 py-5">
                <span 
                    className="text-base mb-5"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    Current Contribution 
                </span>
                <span 
                    className="flex items-center justify-center text-sm text-[#3B2416]"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    <PhilippinePeso size={18}/>
                    {member.money.toLocaleString("en-US")}
                </span>
            </div>

            <div className="flex items-center justify-start gap-2 mb-2 p-1">
                <span
                    className="text-base font-semibold"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    Name: 
                </span>
                <span
                    className="text-[#3B2416] text-sm"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    {member.name}
                </span>
            </div>
            <div className="flex items-center justify-start gap-2 mb-2 p-1">
                <span
                    className="text-base font-semibold"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
                    }}
                >
                    Family Role: 
                </span>
                <span
                    className="text-[#3B2416] text-sm"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
                    }}
                >
                    {member.familyRole}
                </span>
            </div>
        </div>
    )
}

export default ViewMemberModal