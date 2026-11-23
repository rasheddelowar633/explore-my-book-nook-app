
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);

  const privateRoutes = [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/profile",
  ];

  const isPrivateRoute = privateRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // Protect private routes
  if (isPrivateRoute && !sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackURL", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
