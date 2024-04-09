import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const invoiceID = new URL(req.url).pathname.split("/").pop();

    const invoice = await prisma.order.findFirst({
        where: {
            id: invoiceID
        }
    });
    return NextResponse.json(invoice);
}

