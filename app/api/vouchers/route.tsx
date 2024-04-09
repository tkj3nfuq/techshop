import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams.get('id')?.split(',');

    if (query) {
        const vouchers = await prisma.voucher.findMany({
            where: {
                id: {
                    in: query
                }
            }
        });
        return NextResponse.json(vouchers);
    }

    const vouchers = await prisma.voucher.findMany({

    });
    return NextResponse.json(vouchers);
}