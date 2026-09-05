import type { ReactNode } from "react";
import UtilitiesPage from "./expenses/utilities/page";
import FoodAndHousePage from "./expenses/foodandhouse/page";
import TransportationPage from "./expenses/transportation/page";
import HealthPage from "./expenses/health/page";
import HouseMaintenancePage from "./expenses/housemaintenance/page";
import FamilyExpensesPage from "./expenses/familyexpenses/page";
import OtherExpensesPage from "./expenses/otherexpenses/page";

import type { ExpenseCategory } from "../type/model"

const ExpensesSection = ({ category }: { category: ExpenseCategory }) => {
    const Sections: Record< ExpenseCategory, ReactNode > = {
        utilities: <UtilitiesPage/>,
        foodAndHousehold: <FoodAndHousePage/>,
        transportation: <TransportationPage/>,
        health: <HealthPage/>,
        houseMaintenance: <HouseMaintenancePage/>,
        familyExpenses: <FamilyExpensesPage/>,
        otherExpenses: <OtherExpensesPage/>,
    }

    return (
        <>
            {Sections[category]}
        </>
    )
}

export default ExpensesSection