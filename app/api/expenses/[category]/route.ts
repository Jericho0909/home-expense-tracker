import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    const { category } = await params
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

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
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    const { category } = await params;

    const body = await request.json();

    switch (category) {
        case "Utilities":
            if (
                !body.name ||
                !body.expense ||
                !body.amount ||
                !body.status ||
                !body.billingStart ||
                !body.billingEnd ||
                !body.dueDate ||
                !body.notes
            ) {
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
                    billingStart: new Date(body.billingStart),
                    billingEnd: new Date(body.billingEnd),
                    dueDate: new Date(body.dueDate),
                    paymentMethod: body.paymentMethod,
                    notes: body.notes,
                }
            })

            if (!newUtilityExpense) {
                return NextResponse.json(
                    { error: "Failed to create utility expense" },
                    { status: 500 }
                )
            }

            return NextResponse.json(newUtilityExpense, { status: 201 })
        
        case "FoodAndHousehold":
            const newFoodAndHouseholdExpense = await prisma.foodHouseholdExpense.create({
                data: {
                    name: body.name,
                    expense: body.expense,
                    amount: body.amount,
                    type: body.type,
                    category: body.category,
                    status: body.status,
                    purchaseDate: body.purchaseDate,
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

        default:
            // invalid category
            return NextResponse.json({ error: "Invalid expense category" }, { status: 400 })
    }
}