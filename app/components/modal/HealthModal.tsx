import type { HealthExpense, HealthCategory } from "@/app/type/model"

type HealthExpenseForm = Omit<HealthExpense, "category"> & {
    category: HealthCategory | "";
}

const HealthModal = () => {
    const defaultData: HealthExpenseForm = {
        id: 0,
        expense: "Health",
        amount: 0,
        createdAt: "",
        name: "",
        category: "",
        date: ""
    }

    return (
        <form
            className="flex flex-col"
            
        >

        </form>
    )
}

export default HealthModal