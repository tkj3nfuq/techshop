import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const voucherID = new URL(req.url).pathname.split("/").pop();

    const voucher = await prisma.voucher.findFirst({
        where: {
            id: voucherID
        }
    });
    return NextResponse.json(voucher);
}

export async function PATCH(req: Request) {
    const voucherID = new URL(req.url).pathname.split("/").pop();

    const { applyAllItem, applyAllUser, code, description, itemsApply, userApply, type, value } = await req.json();

    const voucher = await prisma.voucher.update({
        where: {
            id: voucherID
        },
        data: {
            applyAllItem,
            applyAllUser,
            code,
            description,
            itemsApply: itemsApply,
            userApply: userApply,
            type,
            value,
        }
    });
    return NextResponse.json(voucher);
}