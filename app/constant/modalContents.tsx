import type { ReactNode } from "react";
import UtilitiesModalForm from "../components/modal/UtilitiesModal";
import FoodAndHouseholdModalForm from "../components/modal/Food&HouseholdModal";
import TransportationModal from "../components/modal/TransportationModal";
import HealthModalForm from "../components/modal/HealthModal";
import HouseMaintenanceModalForm from "../components/modal/HouseMaintenanceModal";
import FamilyExpensesModalForm from "../components/modal/FamilyExpensesModal";
import OtherExepensesModalForm from "../components/modal/OtherExpensesModal";
import BudgetSettingModalForm from "../components/modal/ContributionBudgetModal";
import AddMemberModalForm from "../components/modal/AddMemberModal";
import type { ModalContents } from "../type/model"

export const modalContents: Record<ModalContents, ReactNode> = {
    Dashboard: null,
    Utilities: <UtilitiesModalForm
        id={null}
    />,
    FoodAndHousehold: <FoodAndHouseholdModalForm
        id={null}
    />,
    Transportation: <TransportationModal
        id={null}
    />,
    Health: <HealthModalForm
        id={null}
    />,
    HouseMaintenance: <HouseMaintenanceModalForm
        id={null}
    />,
    FamilyExpenses: <FamilyExpensesModalForm
        id={null}
    />,
    OtherExpenses: <OtherExepensesModalForm
        id={null}
    />,
    BudgetSetting: <BudgetSettingModalForm
        id={null}
    />,
    AddMember: <AddMemberModalForm
        id={null}
    />
}