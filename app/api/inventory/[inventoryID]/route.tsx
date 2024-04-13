import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const inventoryID = new URL(req.url).pathname.split("/").pop();

    const inventory = await prisma.inventory.findFirst({
        where: {
            id: inventoryID
        }
    });
    return NextResponse.json(inventory);
}