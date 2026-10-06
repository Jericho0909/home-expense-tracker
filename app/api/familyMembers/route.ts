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

export async function POST(
    request: Request,
) {
    try{

        const { name, familyRole, money } = await request.json()

        if(!name ||
            !familyRole ||
            money === undefined ||
            money === null){
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const newFamilyMember = await prisma.familyMember.create({
            data: {
                name,
                familyRole,
                money,
            },
        });
        return NextResponse.json(newFamilyMember, { status: 201 });
    }catch(error){
        console.error("Failed to create family member:", error);
        return NextResponse.json(
            { error: "Failed to create family member" },
            { status: 500 }
        );
    }
}