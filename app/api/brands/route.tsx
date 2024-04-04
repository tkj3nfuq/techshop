import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient

export async function GET(req: Request) {
    const brands = await prisma.brand.findMany({

    });
    return NextResponse.json(brands)
}

export async function POST(req: Request) {
    const { name, description } = await req.json()

    const newBrand = await prisma.brand.create({
        data: {
            name,
            description
        }
    })
    return NextResponse.json(newBrand)
}

export async function DELETE(req: Request) {
    const { brandID } = await req.json()

    const deleteBrand = await prisma.brand.delete({
        where: {
            id: brandID
        }
    });
    return NextResponse.json(deleteBrand)
}