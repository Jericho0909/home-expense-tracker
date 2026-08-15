'use client'

import { useEffect, useContext } from "react"
import ModalContext from "../context/modalContext"
import BudgetSettingModalForm from "./modal/BudgetSettingModalForm"


const EditForm = ({edit, id}: {edit: string; id: number | string}) => {
    const { setIsOpen, setActiveModal } = useContext(ModalContext)!

    useEffect(() => {
        setIsOpen(true)
       
    })

    return (
        null
    )
}

export default EditForm