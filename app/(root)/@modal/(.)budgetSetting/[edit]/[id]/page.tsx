import EditForm from "@/app/components/EditForm"
import type { EditType } from "@/app/type/model";
const Edit = async ({params}: {params: Promise<{ edit: EditType; id: number | string }>}) => {
    const { edit, id } = await params
    
    return (
        <EditForm
            edit={edit}
            id ={id}
        />
    )
}

export default Edit