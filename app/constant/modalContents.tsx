import type { ReactNode } from "react";
import UtilitiesModal from "../components/modal/UtilitiesModal";
import FoodAndHouseholdModal from "../components/modal/Food&HouseholdModal";
import TransportationModal from "../components/modal/TransportationModal";
import HealthModal from "../components/modal/HealthModal";
import HouseMaintenanceModal from "../components/modal/HouseMaintenanceModal";
import FamilyExpensesModal from "../components/modal/FamilyExpensesModal";
import OtherExepensesModal from "../components/modal/OtherExpensesModal";
import BudgetSettingModal from "../components/modal/BudgetSettingModal";
import AddMemberModalForm from "../components/modal/AddMemberModalForm";
import type { ModalContents } from "../type/model"

export const modalContents: Record<ModalContents, ReactNode> = {
    Dashboard: null,
    Utilities: <UtilitiesModal/>,
    FoodAndHousehold: <FoodAndHouseholdModal/>,
    Transportation: <TransportationModal/>,
    Health: <HealthModal/>,
    HouseMaintenance: <HouseMaintenanceModal/>,
    FamilyExpenses: <FamilyExpensesModal/>,
    OtherExpenses: <OtherExepensesModal/>,
    BudgetSetting: <BudgetSettingModal/>,
    AddMember: <AddMemberModalForm/>
}