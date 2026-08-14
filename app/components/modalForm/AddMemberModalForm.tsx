'use client'

import { useState } from "react"
import ModalFormButton from "../ModalFormButton"
import type { Member, FamilyRole } from "@/app/type/model"
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter"

type MemberForm = Omit<Member, "familyRole" > & {
    familyRole: FamilyRole | ""
}

const AddMemberModalForm = ({id}: {id?: string | null}) => {
    const defaultData: MemberForm = {
        id: "",
        name: "",
        familyRole: "",
        money: 0,
        createdAt: ""
    }

    const [ member, setMember ] = useState<MemberForm>(defaultData)

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

     const handleCancel = () => {
        setMember(defaultData)
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit}
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
                    className="text-base"
                    style={{
                        fontFamily: "var(--font-libre-baskerville)"
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

            <ModalFormButton
                handleCancel={handleCancel}
            />
        </form>
    )
}

export default AddMemberModalForm