import { PrismaClient, user } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams.get('id')?.split(',');

    if (query) {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: query
                }
            }
        });
        return NextResponse.json(users);
    }

    const users = await prisma.user.findMany({

    });
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const { address, dateOfBirth, email, fullname, password, phoneNumber, role, username } = await req.json();

    const newUser = await prisma.user.create({
        data: {
            address,
            dateOfBirth,
            email,
            fullname,
            password,
            phoneNumber,
            role,
            username
        }
    })
    return NextResponse.json(newUser);
}

export async function DELETE(req: Request) {
    const { userID } = await req.json();

    if (!userID) {
        throw new Error('User ID is missing in the request body.');
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id: userID
        }
    });
    return NextResponse.json(deleteUser);
}