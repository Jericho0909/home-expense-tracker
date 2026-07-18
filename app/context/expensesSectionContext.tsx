'use client'

import { createContext, ReactNode } from "react";
import type { ExpenseSection } from "@/app/type/model";
import useExpensesSection from "@/app/hooks/useExpensesSection";


interface ExpensesSectionContextProps {
    activeSection: ExpenseSection | null;
    setActiveSection: (section: ExpenseSection | null) => void;
}

const ExpensesSectionContext = createContext<ExpensesSectionContextProps | null>(null)

export const ExpensesSectionProvider = ({ children }: { children: ReactNode }) => {
    const { activeSection, setActiveSection } = useExpensesSection()
    return (
        <ExpensesSectionContext.Provider
            value={{
                activeSection,
                setActiveSection
            }}
        >
            {children}
        </ExpensesSectionContext.Provider>
    )
}

export default ExpensesSectionContext