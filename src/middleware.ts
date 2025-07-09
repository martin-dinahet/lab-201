import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/jwt";

const middleware = async (request: NextRequest) => {
  const protectedRoutes = ["/admin"];
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const cookie = request.cookies.get("session")?.value;
  const session = await decrypt(cookie);
  const isLoggedIn = !!session?.userId;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
  return NextResponse.next();
};

export default middleware;
