import ActionModal from "@/components/modal/Action";
import type { ActionContent, Category } from "@/type/model";
const Action = async ({params}: {params: Promise<{ 
    category: Category; action: ActionContent; id: string }>}) => {
    const { category, action, id } = await params
    
    return (
        <ActionModal
            category={category}
            action={action}
            id ={id}
        />
    )
}

export default Action