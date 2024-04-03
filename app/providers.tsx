"use client";
import { getSession, SessionProvider } from "next-auth/react";

export interface AuthContextProps {
    children: React.ReactNode
    session: any
}

export default function AuthProvider({ children }: AuthContextProps) {
    return <SessionProvider>{children}</SessionProvider>
}

AuthProvider.getInitialProps = async (context: any) => {
    const { ctx } = context;
    const session = await getSession(ctx);
    return {
        session,
    };
};