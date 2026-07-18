'use client'

import { useState } from "react";
import type { ExpenseSection } from "@/app/type/model";

const useExpensesSection = () => {
    const [ activeSection, setActiveSection ] = useState<ExpenseSection | null>(null)

    return {
        activeSection,
        setActiveSection
    }

}

export default useExpensesSection


