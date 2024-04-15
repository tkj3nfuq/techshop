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

export async function PUT(req: Request) {
    const inventoryID = new URL(req.url).pathname.split("/").pop();
    const { product, quantity } = await req.json();

    if (!inventoryID) {
        throw new Error('Inventory ID is missing in the request body.');
    }

    const updatedInventory = await prisma.inventory.update({
        where: {
            id: inventoryID
        },
        data: {
            productList: {
                push: {
                    product: product,
                    quantity: quantity
                }
            }
        }
    });
    return NextResponse.json(updatedInventory);
}