'use client'

import { useState, useEffect, useContext } from 'react';

import FamilyMemberContext from '@/context/familyMemberContext';
import type { Member, FamilyRole } from '@/type/model';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { Pencil, PhilippinePeso } from 'lucide-react';
import { toast } from 'sonner';

const EditMemberModal = ({id}: {id?: string | null}) => {
    const { familyMembers } = useContext(FamilyMemberContext)!
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSendingData, setIsSendingData ] = useState<boolean>(false)
    const findMember = familyMembers.find((key) => key.id === id)
    if(!findMember) return

    const [ member, setMember ] = useState<Member>(findMember)

    const FamilyRoles: FamilyRole[] = [
        "Father",
        "Mother",
        "Son",
        "Daughter",
        "Grandfather",
        "Grandmother",
        "Uncle",
        "Aunt",
        "Other",
    ]

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            setIsSendingData(true)
            const response = await fetch(`/api/familyMembers/editFamilyMember/${id}`, 
                {
                method: "PUT",
                body: JSON.stringify(member),
                }
            )

            if(!response.ok){
                throw new Error(
                    `Failed to edit the family member: ${response.status} ${response.statusText}`
                )
            }

            await response.json()
            toast.success("Member edited successfully!")

        }catch(error) {
            toast.error("Failed to edit utility bill.")
            console.error("Error edit utility expense:", error)
        }finally{
            setIsSendingData(false)
        }
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
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-black mb-3">
                <h4 
                    className="flex text-lg font-bold mb-3 text-[#3B2416]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    <span className="mr-2">
                        <Pencil size={24} color="black" fill="yellow"/>
                    </span>
                    Edit Family Member 
                </h4>
                <span
                    className="text-base italic text-[#8B5E3C]"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    Zara Family
                </span>
            </div>

            <div className="flex justify-between flex-col px-1 py-5">
                <span 
                    className="text-base font-semibold mb-5"
                    style={{
                        fontFamily: "var(--font-playfair-display)"
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

            <form
                className="flex flex-col relative"
                onSubmit={handleSubmit}
            >
                <div className={isSendingData ? "blur-[1px]" : ""}>
                    <div className="flex justify-center flex-col gap-2 mb-2 p-1">
                        <label
                            htmlFor="name"
                            className="text-base font-semibold"
                            style={{
                                fontFamily: "var(--font-playfair-display)"
                            }}
                        >
                            Name:
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={member.name}
                            onChange={(e) => setMember((item) => ({
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
                            value={member.familyRole}
                            onChange={(e) =>
                                setMember((item) => ({
                                    ...item,
                                    familyRole: e.target.value as FamilyRole
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

                            {[...FamilyRoles].sort((a, b) => a.localeCompare(b)).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="edit-btn w-full rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
                    >
                        Save
                    </button>
                </div>

                {isSendingData && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#F1E3D0]/60">
                        <div className="loader3">

                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditMemberModal