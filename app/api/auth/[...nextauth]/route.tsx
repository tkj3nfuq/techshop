import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                })
                
                if (user) {
                    return Promise.resolve({id: user.id, name: user.username})
                } else {
                    return Promise.resolve(null)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            return session
        }
    },
    session: {
        strategy: 'jwt'
    },
})

export { handler as GET, handler as POST }