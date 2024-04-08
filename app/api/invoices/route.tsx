import { Prisma } from '@prisma/client'
import { PrismaClient, order } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const invoices = await prisma.order.findMany({
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: invoices.map((invoice) => invoice.user_id)
      }
    }
  });

  const result = invoices.map((invoice) => {
    const user = users.find((user) => user.id === invoice.user_id);
    return {
      ...invoice,
      user
    }
  });

  return NextResponse.json(result);
}
