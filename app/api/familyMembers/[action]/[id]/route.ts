import { prisma  } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();

    try{
        const updatedFamilyMember = await prisma.familyMember.update({
                where: {id},
                data: {
                    name: body.name,
                    familyRole: body.familyRole,
                    money: body.money
                }
            })

            return Response.json(
            {
                success: true,
                data: updatedFamilyMember
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
                    error: "id not found",
                },
                { status: 404 }
            )
        }
        return Response.json(
            {
                success: false,
                error: "Failed to update family member",
            },
            { status: 500 }
        )
    }
}