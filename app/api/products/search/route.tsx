import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const name = new URL(req.url).searchParams.get('name') as string;

    if (!name) {
        return NextResponse.json([]);
    }
    
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        }
    })

    return NextResponse.json(products);
}