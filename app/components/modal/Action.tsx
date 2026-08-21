'use client' 

import { useContext, useEffect } from "react"
import type { ReactNode } from "react";
import ModalContext from "../../context/modalContext" 
import ContributionBudgetModal from "./ContributionBudgetModal"
import EditMemberModal from "./EditMemberModal"
import ViewMemberModal from "./ViewMemberModal"
import UtilitiesModal from "./UtilitiesModal"
import type { ActionContent } from "../../type/model"
 
const ActionModal = ({action, id}: {action: ActionContent; id:string}) => { 
    const { setActiveModal } = useContext(ModalContext)! 
 
    const ActionContents: Record<ActionContent, ReactNode> = { 
        editContribution: <ContributionBudgetModal id={id} />,
        editMember: <EditMemberModal id={id}/>,
        viewMember: <ViewMemberModal id={id}/>,
        editUtilities: <UtilitiesModal id={id} />
    } 

    useEffect(() => {
        setActiveModal(ActionContents[action])
    }, [])
 
    return null 
} 
 
export default ActionModal