import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const userID = new URL(req.url).pathname.split("/").pop();

    const users = await prisma.user.findMany({
        where: {
            id: userID
        }
    });
    return NextResponse.json(users[0]);
}

export async function PATCH(req: Request) {
    const userID = new URL(req.url).pathname.split("/").pop();

    const { address, dateOfBirth, email, fullname, password, phoneNumber, role, username } = await req.json();

    if (!userID) {
        throw new Error('User ID is missing in the request body.');
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userID
        },
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
    });
    return NextResponse.json(updatedUser)
}