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
import type { ActionContent } from "../../type/model"
 
const ActionModal = ({action, id}: {action: ActionContent; id:string}) => { 
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
        editOtherExpenses: <OtherExepensesModal id={id}/>
    } 

    useEffect(() => {
        setActiveModal(ActionContents[action])
    }, [])
 
    return null 
} 
 
export default ActionModal