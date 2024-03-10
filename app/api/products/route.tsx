import { Prisma } from '@prisma/client'
import { PrismaClient, product } from '@prisma/client'
import { NextResponse } from 'next/server';
import React from 'react'

const prisma = new PrismaClient();

export async function GET() {
    const products = await prisma.product.findMany({

    });
    return NextResponse.json(products);
}
