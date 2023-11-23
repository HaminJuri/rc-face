import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.url; // => http://localhost:3000
    const pathname = req.nextUrl.pathname; // => /admin

    if (pathname.startsWith("/profile")) {
        if (!req.cookies.has("TOKEN")) {
            return NextResponse.redirect(new URL("/login", url));
        }
    }
    if (pathname.startsWith("/login")) {
        if (req.cookies.has("TOKEN")) {
            return NextResponse.redirect(new URL("/profile", url));
        }
    }
    if (pathname.startsWith("/login/register")) {
        if (!req.cookies.has("phoneNumber")) {
            if (req.cookies.has("TOKEN")) {
                return NextResponse.redirect(new URL("/profile", url));
            } else if (!req.cookies.has("TOKEN")) {
                return NextResponse.redirect(new URL("/login", url));
            }
        }
    }
}

export const config = {
    matcher: ["/profile/:path*", "/login/:path*"],
};
