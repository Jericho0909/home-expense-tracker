import Modal from "@/app/components/modal/modal";
import { modalContents } from "@/app/constant/modalContents";

const Add = async ({params}: {params: Promise<{action: string; id: number }>}) => {
    const { action, id } = await params
    
    
    
    return (
        <>
            <Modal
                title = "testing"
                children = {
                    <>
                        {modalContents["BudgetSetting"]}
                    </>
                }
            />
        </>
    )
}

export default Add