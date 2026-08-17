import EditForm from "@/app/components/EditForm"
const Edit = async ({params}: {params: Promise<{ edit: string; id: number | string }>}) => {
    const { edit, id } = await params
    
    return (
        <EditForm
            edit={edit}
            id ={id}
        />
    )
}

export default Edit