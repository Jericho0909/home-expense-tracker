import type { ExpensesDataType,
    ExpensesNames,
    BillIconType
} from "../type/model"

interface BillStatusTableProps {
    data: ExpensesDataType[]
    icon: Record<ExpensesNames, BillIconType>
}

import { PhilippinePeso } from "lucide-react";

const BillStatusTable = ({data, icon}: BillStatusTableProps) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="font-bold text-[#3B2416] text-base text-left"
                style={{ fontFamily: "var(--font-cinzel)"}}>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody 
                className="text-sm text-[#8B5E3C]"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <span className="flex items-center gap-2">
                                {icon[item.name].icon}
                                {item.name}
                            </span>
                        </td>
                        <td className="flex items-center">
                            <PhilippinePeso
                                size={16}
                            />
                            {item.amount}
                        </td>
                        <td>
                            {item.status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default BillStatusTable