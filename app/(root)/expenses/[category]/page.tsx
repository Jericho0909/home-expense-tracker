import ExpensesSection from "@/app/components/SectionExpenses"
import type { ExpenseCategory } from "@/app/type/model"

const Expenses = async ({params}: {params: Promise<{category: ExpenseCategory}>}) => {
    const { category } = await params

    return (
        <>
            <ExpensesSection category={category}/>
        </>
    )
}

export default Expenses