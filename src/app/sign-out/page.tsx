// src/app/sign-out/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function SignOutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      await signOut();
      router.push("/");
    };

    performSignOut();
  }, [signOut, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography>ログアウト中...</Typography>
    </Box>
  );
}
