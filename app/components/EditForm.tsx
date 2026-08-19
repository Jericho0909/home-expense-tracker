'use client' 
 
import { useContext, useEffect } from "react" 
import ModalContext from "../context/modalContext" 
import ContributionBudget from "./modal/ContributionBudgetModal"
import type { EditType } from "../type/model"
 
const EditForm = ({edit, id}: {edit: EditType; id: number | string}) => { 
    const { setActiveModal } = useContext(ModalContext)! 
 
    const EditForm = { 
        editContribution: <ContributionBudget id={id} />, 
    } 

    useEffect(() => {
        setActiveModal(EditForm[edit])
    }, [])
 
    return null 
} 
 
export default EditForm 