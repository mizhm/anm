import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get token from auth
    const token = req.nextauth.token;
    const { searchParams } = req.nextUrl;
    const callbackUrl = searchParams.get("callbackUrl");

    if (token && req.nextUrl.pathname === "/login") {
      const redirectUrl = callbackUrl || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Redirect root to dashboard
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without auth
        if (req.nextUrl.pathname === "/login" && !token) {
          return true;
        }
        // Require auth for other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/api/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
