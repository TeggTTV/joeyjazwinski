import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: any, res: any, next: any) {
    // Add a new header x-current-path which passes the path to downstream components
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
