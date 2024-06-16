import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const isLogin = req.nextUrl.pathname.startsWith('/login');
    const isRegister = req.nextUrl.pathname.startsWith('/register');
    const isResetPassword = req.nextUrl.pathname.startsWith('/reset-password');

    if ((isLogin || isRegister || isResetPassword) && isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (isRegister || isResetPassword) return

    const authMiddleware = await withAuth({
        pages: {
            signIn: `/login`,
        },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
}
export const config = {
    matcher: ["/rtchat", "/message", "/message/:id", "/setting", "/login", "/register", "/reset-password"]
}