import type { ExpensesDataType,
    ExpensesNames,
    IconType,
    StatusType
} from "../type/model"

interface BillStatusTableProps {
    data: ExpensesDataType[]
    icons: Record<ExpensesNames, IconType>
    statusIcons: Record<StatusType, IconType>
}

import { PhilippinePeso } from "lucide-react";

const BillStatusTable = ({data, icons, statusIcons}: BillStatusTableProps) => {
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
                            <span className="flex items-center gap-1">
                                {icons[item.name].icon}
                                {item.name}
                            </span>
                        </td>
                        <td className="flex items-center">
                            <span className="flex items-center gap-1">
                                <PhilippinePeso
                                    size={16}
                                />
                                {item.amount}
                            </span>
                        </td>
                        <td>
                            <span className="flex items-center gap-1">
                                {statusIcons[item.status].icon}
                                {item.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default BillStatusTable