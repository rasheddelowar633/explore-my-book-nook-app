
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Check Better Auth session cookie
  const sessionCookie = getSessionCookie(request);

  // Private routes
  const privateRoutes = [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/profile",
  ];

  // Check if current route is private
  const isPrivateRoute = privateRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // If user is not logged in, redirect to Sign In
  if (isPrivateRoute && !sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set("callbackURL", pathname);

    return NextResponse.redirect(signInUrl);
  }

  // If user is already logged in, redirect from auth pages
  if (
    (pathname === "/sign-in" || pathname === "/sign-up") &&
    sessionCookie
  ) {
    return NextResponse.redirect(new URL("/", request.url));
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
