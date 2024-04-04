import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import React from 'react'

const prisma = new PrismaClient

export async function GET(req: Request) {
    const brands = await prisma.brand.findMany({

    });
    return NextResponse.json(brands)
}
