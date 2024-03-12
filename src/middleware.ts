import { auth } from "./auth"

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";

// @ts-ignore
export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // console.log(`Route: ${nextUrl.pathname}, isLoggedIn: ${isLoggedIn}`);

    if (isAuthRoute) {
        if (isLoggedIn) {
            console.log(`Redirecting to ${DEFAULT_LOGIN_REDIRECT}`);
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if (isApiAuthRoute) {
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(
            `${apiAuthPrefix}/signin?callbackUrl=${encodedCallbackUrl}`,
            nextUrl
        ));
    }

    return null;
})


// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}