import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
) {
    try{
        const familyMembers = await prisma.familyMember.findMany();
        return NextResponse.json(familyMembers);
    }catch(error){
        return NextResponse.json(
            { error: "Failed to fetch family members" },
            { status: 500 }
        )
    }
}