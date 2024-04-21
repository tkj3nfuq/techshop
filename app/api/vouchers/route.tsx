import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {

    const vouchers = await prisma.voucher.findMany({

    });
    return NextResponse.json(vouchers);
}

export async function POST(req: Request) {
    const {
        code,
        type,
        description,
        value,
        maxValueInFinalPrice,
        applyAllUser,
        applyAllItem,
        products,
        users
    } = await req.json();

    const voucher = await prisma.voucher.create({
        data: {
            code,
            type,
            description,
            value,
            maxValueInFinalPrice,
            applyAllUser,
            applyAllItem,
            itemsApply: products,
            userApply: users
        }
    });
    return NextResponse.json(voucher);
}

export async function DELETE(req: Request) {
    const { voucherID } = await req.json();
    
    const voucher = await prisma.voucher.delete({
        where: {
            id: voucherID
        }
    });
    return NextResponse.json(voucher);
}