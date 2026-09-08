import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    const { category } = await params

    let expenses

    switch (category) {
        case "Utilities":
            expenses = await prisma.utilityExpense.findMany()
            break

        case "FoodAndHousehold":
            expenses = await prisma.foodHouseholdExpense.findMany()
            break

        case "Transportation":
            expenses = await prisma.transportationExpense.findMany()
            break

        case "Health":
            expenses = await prisma.healthExpense.findMany()
            break

        case "HouseMaintenance":
            expenses = await prisma.houseMaintenanceExpense.findMany()
            break

        case "FamilyExpenses":
            expenses = await prisma.familyExpense.findMany()
            break

        case "OtherExpenses":
            expenses = await prisma.otherExpense.findMany()
            break

        default:
            return NextResponse.json(
                { error: "Invalid expense category" },
                { status: 400 }
            )
    }

    return NextResponse.json(expenses)
}