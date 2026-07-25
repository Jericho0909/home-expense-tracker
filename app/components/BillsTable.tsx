import { color } from "framer-motion";
import type { ExpensesDataType,
    ExpensesNames,
    IconType,
    StatusType
} from "../type/model"
import formatBillingPeriod from "../utils/formatBillingPeriod"


interface BillStatusTableProps {
    data: ExpensesDataType[]
    icons: Record<ExpensesNames, IconType>
    statusIcons: Record<StatusType, IconType>
}

import { PhilippinePeso } from "lucide-react";

const BillsTable = ({data, icons, statusIcons}: BillStatusTableProps) => {
    return (
        <table className="w-full border-separate border-spacing-y-2">
            <thead>
                <tr className="font-bold text-[#3B2416] text-base text-left"
                style={{ fontFamily: "var(--font-cinzel)"}}>
                    <th>Utility</th>
                    <th>Billing Period</th>
                    <th>Due Date</th>
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
                                {icons[item.name].icon}
                                {item.name}
                            </span>
                        </td>

                        <td>
                            {formatBillingPeriod(
                                item.billingStart,
                                item.billingEnd
                            )}
                        </td>

                        <td>
                            {item.dueDate}
                        </td>

                        <td>
                            <span className="flex items-center gap-1">
                                <PhilippinePeso size={16} />
                                {item.amount}
                            </span>
                        </td>

                        <td>
                            <span className="flex items-center gap-1">
                                {statusIcons[item.status].icon}
                                {item.status}
                            </span>
                        </td>

                        <td>
                            <select
                                defaultValue=""
                                onChange={(e) => {
                                    const action = e.target.value;

                                    if (action === "view") {
                                        // View action
                                    }

                                    if (action === "edit") {
                                        // Edit action
                                    }

                                    if (action === "delete") {
                                        // Delete action
                                    }
                                }}
                                className="cursor-pointer rounded-md border border-[#6B4632] bg-[#F5F5DC] px-3 py-2 text-sm text-[#5C4033] outline-none"
                            >
                                <option value="" disabled>
                                    Actions
                                </option>
                                <option value="view">View</option>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default BillsTable