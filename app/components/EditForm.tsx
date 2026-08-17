'use client' 
 
import { useContext, useEffect } from "react" 
import { type ReactNode, type SetStateAction } from "react";import ModalContext from "../context/modalContext" 
import BudgetSettingModalForm from "./modal/BudgetSettingModalForm" 
 
 
const EditForm = ({edit, id}: {edit: string; id: number | string}) => { 
    const { setActiveModal } = useContext(ModalContext)! 
 
    const EditForm = { 
        editContribution: <BudgetSettingModalForm id={id} />, 
    } 

    useEffect(() => {
        setActiveModal(EditForm["editContribution"])
    }, [])
 
    return null 
} 
 
export default EditForm 