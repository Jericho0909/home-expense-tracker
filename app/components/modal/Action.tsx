'use client' 
 
import { useContext, useEffect } from "react" 
import ModalContext from "../../context/modalContext" 
import ContributionBudget from "./ContributionBudgetModal"
import AddMemberModal from "./AddMemberModal"
import type { ActionContent } from "../../type/model"
 
const ActionModal = ({action, id}: {action: ActionContent; id:string}) => { 
    const { setActiveModal } = useContext(ModalContext)! 
    console.log("nagana")
 
    const ActionContents = { 
        editContribution: <ContributionBudget id={id} />,
        editMember: <AddMemberModal id={id}/>
    } 

    useEffect(() => {
        setActiveModal(ActionContents[action])
    }, [])
 
    return null 
} 
 
export default ActionModal