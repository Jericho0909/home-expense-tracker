import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request,) {
    try{
        const budget = await prisma.expenseBudget.findMany({
            orderBy: [
                { year: "desc" },
                { month: "desc" },
            ]
        })
        return NextResponse.json(budget)
    }catch(error){
        console.error("Failed to fetch expense budgets:", error)

        return NextResponse.json(
            { error: "Failed to fetch expenses budget" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try{
        const body = await request.json()

        const { category, amount } = body

        const currentDate = new Date()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        const budget = await prisma.expenseBudget.create({
            data: {
                category,
                month,
                year,
                amount,
            },
        })

        return NextResponse.json(budget, { status: 201 })
    }catch (error){
        console.error("Failed to create expense budget:", error)

        return NextResponse.json(
            { error: "Failed to create expense budget" },
            { status: 500 }
        )
    }
}