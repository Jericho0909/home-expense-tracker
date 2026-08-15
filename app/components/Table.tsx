import type { TableColumn } from "../type/model"

interface TableProps<T extends { id: number | string }> {
    data: T[];
    columns: TableColumn<T>[];
}

const Table = <T extends { id: number | string }>({
    data,
    columns,
}: TableProps<T>) => {
    return (
        <table className="w-full border-separate border-spacing-y-2">
            <thead>
                <tr
                    className="text-left text-base font-bold text-[#3B2416]"
                    style={{
                        fontFamily: "var(--font-cinzel)",
                    }}
                >
                    {columns.map((column) => (
                        <th key={column.label}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody
                className="text-sm text-[#8B5E3C]"
                style={{
                    fontFamily: "var(--font-libre-baskerville)",
                }}
            >
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={column.label}>
                                {column.render(item)}
                            </td>
                        ))}
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
    );
};

export default Table