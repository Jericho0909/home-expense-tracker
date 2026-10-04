import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ category: string, id: string }> }) {
    const { category, id } = await params;
    const body = await request.json();

    try{
        switch (category) {
            case "utility":
                const updatedUtilityExpense = await prisma.utilityExpense.update({
                    where: {id},
                    data: {
                    name: body.name,
                    expense: body.expense,
                    amount: body.amount,
                    status: body.status,
                    billingStart: new Date(body.billingStart),
                    billingEnd: new Date(body.billingEnd),
                    dueDate: new Date(body.dueDate),
                    paymentMethod: body.paymentMethod,
                    notes: body.notes,
                }
                });
                return Response.json({
                    success: true,
                    data: updatedUtilityExpense,
                    status: 200
                })
            default:
                return Response.json({
                    success: false,
                    error: "Invalid category"
                }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating expense:", error);
        return Response.json({
            success: false,
            error: "Failed to update expense"
        }, { status: 500 });
    }

}