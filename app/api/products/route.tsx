import { Prisma } from '@prisma/client'
import { PrismaClient, product, ProductProperties } from '@prisma/client'
import { NextResponse } from 'next/server';
import React from 'react'

const prisma = new PrismaClient();

export async function GET() {
    const products = await prisma.product.findMany({

    });
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const { name, category, description, price, image, properties } = await req.json();

    const newProduct = await prisma.product.create({
        data: {
            name,
            category,
            description,
            price,
            image,
            properties: properties
        },
    });
    return NextResponse.json(newProduct);
}

export async function DELETE(req: Request) {
    const { productID } = await req.json();

    if (!productID) {
        throw new Error('Product ID is missing in the request body.');
    }

    const deleteProduct = await prisma.product.delete({
        where: {
            id: productID
        }
    });
    return NextResponse.json(deleteProduct);
}
