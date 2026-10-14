'use client' 

import { useContext, useEffect } from "react"
import type { ReactNode } from "react";
import ModalContext from "../../context/modalContext" 
import ContributionBudgetModal from "./ContributionBudgetModal"
import EditMemberModal from "./EditMemberModal"
import ViewMemberModal from "./ViewMemberModal"
import ViewUtilitiesModal from "./UtilitiesViewModal";
import ViewFoodAndHouseholdModal from "./FoodAndHouseholdViewModal";
import ViewTransportationModal from "./TransportationViewModal";
import ViewHealthModal from "./HealthViewModal";
import ViewHouseMaintenanceModal from "./HouseMaintenanceViewModal";
import ViewFamilyExpensesModal from "./FamilyExpensesViewModal";
import ViewOtherExpensesModal from "./OtherExpensesViewModal";
import UtilitiesModal from "./UtilitiesModal"
import FoodAndHouseholdModal from "./FoodAndHouseholdModal";
import TransportationModal from "./TransportationModal";
import HealthModal from "./HealthModal";
import HouseMaintenanceModal from "./HouseMaintenanceModal";
import FamilyExpensesModal from "./FamilyExpensesModal";
import OtherExepensesModal from "./OtherExpensesModal";
import UtilitiesPaidModal from "./UtilitiesPaidModal";
import FoodAndHouseholdPaidModal from "./FoodAndHouseholdPaidModal";
import DeleteExpense from "./DeleteExpense";
import type { ActionContent, ExpenseCategory } from "../../type/model"
 
const ActionModal = ({category, action, id}: {category: ExpenseCategory; action: ActionContent; id:string}) => { 
    const { setActiveModal } = useContext(ModalContext)!
 
    const ActionContents: Record<ActionContent, ReactNode> = { 
        editContribution: <ContributionBudgetModal id={id}/>,
        editMember: <EditMemberModal id={id}/>,
        viewMember: <ViewMemberModal id={id}/>,
        viewUtilities: <ViewUtilitiesModal id={id}/>,
        viewFoodAndHousehold: <ViewFoodAndHouseholdModal id={id}/>,
        viewTransportation: <ViewTransportationModal id={id}/>,
        viewHealth: <ViewHealthModal id={id}/>,
        viewHouseMaintenance: <ViewHouseMaintenanceModal id={id}/>,
        viewFamilyExpenses: <ViewFamilyExpensesModal id={id}/>,
        viewOtherExpenses: <ViewOtherExpensesModal id={id}/>,
        editUtilities: <UtilitiesModal id={id} />,
        editFoodAndHousehold: <FoodAndHouseholdModal id={id}/>,
        editTransportation: <TransportationModal id={id}/>,
        editHealth: <HealthModal id={id}/>,
        editHouseMaintenance: <HouseMaintenanceModal id={id}/>,
        editFamilyExpenses: <FamilyExpensesModal id={id}/>,
        editOtherExpenses: <OtherExepensesModal id={id}/>,
        paidUtilities: <UtilitiesPaidModal id={id}/>,
        paidFoodAndHousehold: <FoodAndHouseholdPaidModal id={id}/>,
        deleteExpense: <DeleteExpense category={category} id={id}/>
    } 

    useEffect(() => {
        setActiveModal(ActionContents[action])
    }, [])
 
    return null 
} 
 
export default ActionModal