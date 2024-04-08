import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {   
    const inventory = await prisma.inventory.findMany({

    });

    return NextResponse.json(inventory);
}