import { Prisma } from '@prisma/client'
import { PrismaClient, order } from '@prisma/client'
import { NextResponse } from 'next/server';
import React from 'react'

const prisma = new PrismaClient();

export async function GET() {
  const invoices = await prisma.order.findMany({
    
  });
  return NextResponse.json(invoices);
}
