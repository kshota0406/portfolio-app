"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "@clerk/nextjs";

export default function SignInCallbackPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      // 認証状態をローカルストレージに保存
      localStorage.setItem(
        "authState",
        JSON.stringify({ isSignedIn, isLoaded })
      );

      // リダイレクト先（前のページやホームページなど）
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>認証情報を確認中...</Typography>
    </Box>
  );
}
