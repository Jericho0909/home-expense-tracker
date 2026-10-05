'use client'

import { createContext, useState, useEffect } from "react";
import type { Member } from "@/type/model";
import { getFamilyMembers } from "@/lib/familyMembers";

interface FamilyMemberContextType {
    familyMembers: Member[];
    setFamilyMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const FamilyMemberContext = createContext<FamilyMemberContextType | null>(null)

export const FamilyMemberProvider = ({ children }: { children: React.ReactNode }) =>{
    const [ familyMembers, setFamilyMembers ] = useState<Member[]>([])

    useEffect(() => {
        const fetchFamilyMembers = async () => {
            try{
                const response = await getFamilyMembers()
                setFamilyMembers(response.data)
            }catch(error){
                console.error("Failed to fetch family members:", error)
            }
        }

        fetchFamilyMembers()
    }, [])

    return (
        <FamilyMemberContext.Provider
            value={{ 
                familyMembers, setFamilyMembers 
            }}
        >
            {children}
        </FamilyMemberContext.Provider>
    )
}

export default FamilyMemberContext
