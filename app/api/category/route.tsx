import React from 'react'
import { Prisma } from '@prisma/client'
import { PrismaClient, category } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const categories = await prisma.category.findMany({
    });
    return NextResponse.json(categories);
}