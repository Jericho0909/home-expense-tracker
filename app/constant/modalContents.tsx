import type { ReactNode } from "react";
import UtilitiesModalForm from "../components/modalForm/UtilitiesModalForm";
import FoodAndHouseholdModalForm from "../components/modalForm/Food&HouseholdModalForm";
import TransportationModal from "../components/modalForm/TransportationModalForm";
import HealthModalForm from "../components/modalForm/HealthModalForm";
import HouseMaintenanceModalForm from "../components/modalForm/HouseMaintenanceModalForm";
import FamilyExpensesModalForm from "../components/modalForm/FamilyExpensesModalForm";
import OtherExepensesModalForm from "../components/modalForm/OtherExpensesModalForm";
import BudgetSettingModalForm from "../components/modalForm/BudgetSettingModalForm";
import AddMemberModalForm from "../components/modalForm/AddMemberModalForm";
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