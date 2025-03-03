// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  // パブリックルート（認証なしでアクセス可能）
  publicRoutes: ["/", "/profile", "/projects/:path*", "/sign-in", "/sign-up"],

  // 認証処理後に実行される関数
  afterAuth(auth, req) {
    // 現在のパス
    const url = new URL(req.url);

    // 管理者ページへのアクセスを制限（/admin で始まるページ）
    if (url.pathname.startsWith("/admin") && !auth.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // 非公開ルートへの未認証アクセスをサインインページにリダイレクト
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
