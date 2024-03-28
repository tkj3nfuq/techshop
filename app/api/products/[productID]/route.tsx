import { Prisma } from '@prisma/client'
import { PrismaClient, product, ProductProperties } from '@prisma/client'
import { NextResponse } from 'next/server';
import React from 'react'

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const productID = new URL(req.url).pathname.split("/").pop();
    
    const products = await prisma.product.findMany({
        where: {
            id: productID
        }
    });
    return NextResponse.json(products[0]);
}


export async function PATCH(req: Request) {
    const productID = new URL(req.url).pathname.split("/").pop();

    const { name, category, description, price, image, properties } = await req.json();

    if (!productID) {
        throw new Error('Product ID is missing in the request body.');
    }

    const newProduct = await prisma.product.update({
        where: {
            id: productID,
        },
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