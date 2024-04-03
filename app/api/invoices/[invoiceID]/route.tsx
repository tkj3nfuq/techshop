import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const invoiceID = new URL(req.url).pathname.split("/").pop();

    const invoices = await prisma.order.findMany({
        where: {
            id: invoiceID
        }
    });
    return NextResponse.json(invoices[0]);
}

