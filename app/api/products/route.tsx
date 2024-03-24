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