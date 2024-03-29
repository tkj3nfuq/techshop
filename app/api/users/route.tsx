import React from 'react'
import { PrismaClient, user } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const users = await prisma.user.findMany({

    });
    return NextResponse.json(users);
}
