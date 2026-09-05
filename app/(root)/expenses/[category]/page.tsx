import ExpensesSection from "@/components/SectionExpenses"
import type { ExpenseCategory } from "@/type/model"

const Expenses = async ({params}: {params: Promise<{category: ExpenseCategory}>}) => {
    const { category } = await params

    return (
        <>
            <ExpensesSection category={category}/>
        </>
    )
}

export default Expenses