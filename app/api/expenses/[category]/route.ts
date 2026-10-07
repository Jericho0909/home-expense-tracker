import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    try {
        const { category } = await params

        const url = new URL(request.url)
        const page = Number(url.searchParams.get("page")) || 1
        const limit = Number(url.searchParams.get("limit")) || 10
        const skip = (page - 1) * limit

        let expenses

        switch (category) {
            case "Utilities":
                expenses = await prisma.utilityExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            case "FoodAndHousehold":
                expenses = await prisma.foodHouseholdExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            case "Transportation":
                expenses = await prisma.transportationExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            case "Health":
                expenses = await prisma.healthExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            case "HouseMaintenance":
                expenses = await prisma.houseMaintenanceExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            case "FamilyExpenses":
                expenses = await prisma.familyExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            case "OtherExpenses":
                expenses = await prisma.otherExpense.findMany({
                    skip,
                    take: limit,
                })
                break

            default:
                return NextResponse.json(
                    { error: "Invalid expense category" },
                    { status: 400 }
                )
        }

        return NextResponse.json(expenses)

    } catch (error) {
        console.error("GET expenses error:", error)

        return NextResponse.json(
            { error: "Failed to fetch expenses" },
            { status: 500 }
        )
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    try{
        const { category } = await params;

        const body = await request.json();

        switch (category) {
            case "Utilities":
                if(
                    !body.name ||
                    !body.expense ||
                    !body.amount ||
                    !body.status
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }

                const newUtilityExpense = await prisma.utilityExpense.create({
                    data: {
                        name: body.name,
                        expense: body.expense,
                        amount: body.amount,
                        status: body.status,
                        billingStart: body.billingStart
                            ? new Date(body.billingStart)
                            : null,

                        billingEnd: body.billingEnd
                            ? new Date(body.billingEnd)
                            : null,

                        dueDate: body.dueDate
                            ? new Date(body.dueDate)
                            : null,
                        paymentMethod: body.paymentMethod,
                        notes: body.notes,
                    }
                })

                if(!newUtilityExpense){
                    return NextResponse.json(
                        { error: "Failed to create utility expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newUtilityExpense, { status: 201 })
            
            case "FoodAndHousehold":
                if(
                    !body.name ||
                    !body.expense ||
                    !body.amount ||
                    !body.type ||
                    !body.category ||
                    !body.status
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }

            
                const newFoodAndHouseholdExpense = await prisma.foodHouseholdExpense.create({
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

                if(!newFoodAndHouseholdExpense){
                    return NextResponse.json(
                        { error: "Failed to create food and household expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newFoodAndHouseholdExpense, { status: 201 })

            case "Transportation":
                if(
                    !body.description ||
                    !body.expense ||
                    !body.category ||
                    !body.amount ||
                    !body.paymentMethod ||
                    !body.date ||
                    !body.notes
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }    
                
                const newTransportationExpense = await prisma.transportationExpense.create({
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

                if(!newTransportationExpense){
                    return NextResponse.json(
                        { error: "Failed to create transportation expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newTransportationExpense, { status: 201 })

            case "Health": 
                if(
                    !body.description ||
                    !body.expense ||
                    !body.category ||
                    !body.amount ||
                    !body.paymentMethod ||
                    !body.date ||
                    !body.notes
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }    
                
                const newHealthExpense = await prisma.healthExpense.create({
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

                if(!newHealthExpense){
                    return NextResponse.json(
                        { error: "Failed to create health expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newHealthExpense, { status: 201 })
            
            case "HouseMaintenance":
                if(
                    !body.description ||
                    !body.expense ||
                    !body.category ||
                    !body.amount ||
                    !body.paymentMethod ||
                    !body.date ||
                    !body.notes
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }    

                const newHouseMaintenancExpense = await prisma.houseMaintenanceExpense.create({
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
                
                if(!newHouseMaintenancExpense){
                    return NextResponse.json(
                        { error: "Failed to create house maintenance expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newHouseMaintenancExpense, { status: 201 })

            case "FamilyExpense":
                if(
                    !body.description ||
                    !body.expense ||
                    !body.category ||
                    !body.amount ||
                    !body.paymentMethod ||
                    !body.date ||
                    !body.notes
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }

                const newFamilyExpense = await prisma.familyExpense.create({
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

                if(!newFamilyExpense){
                    return NextResponse.json(
                        { error: "Failed to create family expense expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newFamilyExpense, { status: 201 })

            case "OtherExpense":
                if(
                    !body.description ||
                    !body.expense ||
                    !body.category ||
                    !body.amount ||
                    !body.paymentMethod ||
                    !body.date ||
                    !body.notes
                ){
                    return NextResponse.json(
                        { error: "Missing required fields" },
                        { status: 400 }
                    )
                }

                const newOtherExpense = await prisma.otherExpense.create({
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

                if(!newOtherExpense){
                    return NextResponse.json(
                        { error: "Failed to create other expense" },
                        { status: 500 }
                    )
                }

                return NextResponse.json(newOtherExpense, { status: 201 })

            default:
                // invalid category
                return NextResponse.json({ error: "Invalid expense category" }, { status: 400 })
        }
    }catch(error){
        console.error("Failed to create expense:", error);

        return NextResponse.json(
            { error: "Failed to create expense" },
            { status: 500 }
        );
    }
}