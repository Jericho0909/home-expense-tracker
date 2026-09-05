import ActionModal from "@/components/modal/Action";
import type { ActionContent } from "@/type/model";
const Action = async ({params}: {params: Promise<{ action: ActionContent; id: string }>}) => {
    const { action, id } = await params
    
    return (
        <ActionModal
            action={action}
            id ={id}
        />
    )
}

export default Action