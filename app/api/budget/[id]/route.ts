import { prisma  } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export async function PUT(request: Request, { params }: { params: Promise<{
    id: string }>}) {
        const { id } = await params
        const body = await request.json()

        const currentDate = new Date()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        try{
            const updateBudget = await prisma.expenseBudget.update({
                where: { id },
                data: {
                    category: body.category,
                    amount: body.amount,
                    month,
                    year
                }
            })

            return Response.json(
                {
                    success: true,
                    data: updateBudget,
                },
                { status: 200 }
            )
        }catch(error){
            if(
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ){
            return Response.json(
                {
                    success: false,
                    error: "Expense id not found",
                },
                { status: 404 }
            )
        }
        return Response.json(
            {
                success: false,
                error: "Failed to update budget ",
            },
            { status: 500 }
        )
    }
}