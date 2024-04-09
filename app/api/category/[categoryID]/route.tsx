import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    const categoryID = new URL(req.url).pathname.split("/").pop();

    const category = await prisma.category.findUnique({
        where: {
            id: categoryID
        }
    });

    return NextResponse.json(category);
}