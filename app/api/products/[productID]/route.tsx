import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const productID = new URL(req.url).pathname.split("/").pop();

    const product = await prisma.product.findFirst({
        where: {
            id: productID
        }
    });
    return NextResponse.json(product);
}


export async function PATCH(req: Request) {
    const productID = new URL(req.url).pathname.split("/").pop();

    const { name, category, description, price, image, properties } = await req.json();

    if (!productID) {
        throw new Error('Product ID is missing in the request body.');
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id: productID,
        },
        data: {
            name,
            category,
            description,
            price,
            previewImage: image,
            properties: properties
        },
    });
    return NextResponse.json(updatedProduct);
}