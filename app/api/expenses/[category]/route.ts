import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { ExpenseCategory } from "@/type/model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
    const { category } = await params

    const expenses = await prisma.expense.findMany({
        where: {
        expense: category as ExpenseCategory,
        },
    }); 

    return NextResponse.json(expenses)
}