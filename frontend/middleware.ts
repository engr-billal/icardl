import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const protectedPaths = [
    "/auth/upload",
    "/auth/social-links",
    "/auth/address",
    "/order-card",
    "/connections",
    "/profile",
    "/dashboard",
  ];

  const publicPaths = ["/auth", "/auth/register"];

  const currentPath = new URL(request.url).pathname;

  if (protectedPaths.includes(currentPath)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  if (publicPaths.includes(currentPath)) {
    if (!token) return NextResponse.next();
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/upload",
    "/auth/social-links",
    "/auth/address",
    "/order-card",
    "/auth",
    "/auth/register",
    "/connections",
    "/profile",
    "/dashboard",
  ],
};
