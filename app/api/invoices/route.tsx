import { Prisma } from '@prisma/client'
import { PrismaClient, invoice } from '@prisma/client'
import { NextResponse } from 'next/server';
import React from 'react'

const prisma = new PrismaClient();

export async function GET() {
  const invoices = await prisma.invoice.findMany({
  });
  return NextResponse.json(invoices);
}
