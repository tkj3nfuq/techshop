import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT }  from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            name: string
            id: string
        }
    }

    interface User extends DefaultUser {
        name: string
        id: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        name: string
        id: string
    }
}