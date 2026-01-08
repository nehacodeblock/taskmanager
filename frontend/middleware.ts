export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("middleware");
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;
  console.log("token", token);
  console.log("auth route---1");

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isProtectedRoute = pathname.startsWith("/tasks");

  if (token && isAuthRoute) {
    console.log("auth route");
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  if (!token && isProtectedRoute) {
    console.log("protected route---");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
