import { prisma  } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export async function PUT(request: Request, { params }: { params: Promise<{ category: string, id: string }> }) {
    const { category, id } = await params;
    const body = await request.json();

    try{
        switch (category) {
            case "Utilities":
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
                })

                return Response.json(
                {
                    success: true,
                    data: updatedUtilityExpense,
                },
                { status: 200 }
            )

            case "FoodAndHousehold":
                const updatedFoodAndHouseholdExpense = await prisma.foodHouseholdExpense.update({
                    where: {id},
                    data: {
                        name: body.name,
                        expense: body.expense,
                        amount: body.amount,
                        type: body.type,
                        category: body.category,
                        status: body.status,
                        purchaseDate: body.purchaseDate
                            ? new Date(body.purchaseDate)
                            : null,
                        paymentMethod: body.paymentMethod,
                        notes: body.notes
                    }
                })
                return Response.json(
                {
                    success: true,
                    data: updatedFoodAndHouseholdExpense,
                },
                { status: 200 }
            )

            case "Transportation":
                const updatedTransportationExpense = await prisma.transportationExpense.update({
                    where: {id},
                    data: {
                        description: body.description,
                        expense: body.expense,
                        category: body.category,
                        amount: body.amount,
                        paymentMethod: body.paymentMethod,
                        date: new Date(body.date),
                        notes: body.notes
                    }
                })
                return Response.json(
                {
                    success: true,
                    data: updatedTransportationExpense,
                },
                { status: 200 }
            )
            
            case "Health":
                const updatedHealthExpense = await prisma.healthExpense.update({
                    where: {id},
                    data: {
                        description: body.description,
                        expense: body.expense,
                        category: body.category,
                        amount: body.amount,
                        paymentMethod: body.paymentMethod,
                        date: new Date(body.date),
                        notes: body.notes
                    }
                })
                return Response.json(
                {
                    success: true,
                    data: updatedHealthExpense,
                },
                { status: 200 }
            )

            case "HouseMaintenance":
                const updatedHouseMaintenanceExpense = await prisma.houseMaintenanceExpense.update({
                    where: {id},
                    data: {
                        description: body.description,
                        expense: body.expense,
                        category: body.category,
                        amount: body.amount,
                        paymentMethod: body.paymentMethod,
                        date: new Date(body.date),
                        notes: body.notes
                    }
                })

                return Response.json(
                {
                    success: true,
                    data: updatedHouseMaintenanceExpense,
                },
                { status: 200 }
            )

            case "FamilyExpenses":
                const updatedFamilyExpense = await prisma.familyExpense.update({
                    where: {id},
                    data: {
                        description: body.description,
                        expense: body.expense,
                        category: body.category,
                        amount: body.amount,
                        paymentMethod: body.paymentMethod,
                        date: new Date(body.date),
                        notes: body.notes
                    }
                })

                return Response.json(
                {
                    success: true,
                    data: updatedFamilyExpense,
                },
                { status: 200 }
            )

            case "OtherExpenses":
                const updatedOtherExpense = await prisma.otherExpense.update({
                    where: {id},
                    data: {
                        description: body.description,
                        expense: body.expense,
                        category: body.category,
                        amount: body.amount,
                        paymentMethod: body.paymentMethod,
                        date: new Date(body.date),
                        notes: body.notes
                    }
                })

                return Response.json(
                {
                    success: true,
                    data: updatedOtherExpense,
                },
                { status: 200 }
            )

            default:
                return Response.json({
                    success: false,
                    error: "Invalid category"
                }, { status: 400 })
        }
    }catch(error){
        if(
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ){
            return Response.json(
                {
                    success: false,
                    error: "Expense not found",
                },
                { status: 404 }
            )
        }
        return Response.json(
            {
                success: false,
                error: "Failed to update expense",
            },
            { status: 500 }
        )
    }

}