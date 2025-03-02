import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // publicRoutesは必要に応じて設定
  publicRoutes: ["/", "/profile", "/projects/:path*", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
