import { Pencil, PhilippinePeso } from 'lucide-react';

const EditMemberModal = ({id}: {id?: string | null}) => {
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
        </div>
    )
}

export default EditMemberModal