import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	async function middleware(req) {
		const pathname = req.nextUrl.pathname; // relative path

		// manage route protection
		const token = await getToken({ req });
		const isAuth = !!token;

		const isAuthPage = pathname.startsWith("/login");

		const sensitiveRoute = ["/dashboard", "/monitoring", "/account"];

		if (isAuthPage) {
			if (isAuth) {
				return NextResponse.redirect(new URL("/dashboard", req.url));
			}

			return null;
		}

		if (!isAuth && sensitiveRoute.some((route) => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	},
	{
		callbacks: {
			async authorized() {
				return true;
			},
		},
	}
);

export const config = {
	matcher: [
		"/",
		"/login",
		"/register",
		"/dashboard/:path*",
		"/api/:path*",
		"/account/:path*",
		"/monitoring",
	],
};
