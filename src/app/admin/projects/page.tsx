"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function AdminProjectsPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  // 認証状態を確認
  useEffect(() => {
    console.log("Auth state:", { isLoaded, isSignedIn });

    let timeoutId: NodeJS.Timeout;

    if (isLoaded) {
      if (!isSignedIn) {
        // 未認証ユーザーをサインインページへリダイレクト
        router.push("/sign-in");
      } else {
        // 短い遅延を入れてローディングを停止（状態の同期問題を回避）
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoaded, isSignedIn, router]);

  // ローディング表示
  if (!isLoaded || loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>認証確認中...</Typography>
        <Typography variant="caption" color="text.secondary">
          ※ボタンからアクセスした場合、一度ページを更新すると表示されます
        </Typography>
      </Box>
    );
  }

  // 認証済みユーザー向け表示
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        プロジェクト管理
      </Typography>
      <Typography paragraph>
        認証されました。管理ページにアクセスできます。
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
      >
        トップページに戻る
      </Button>

      {/* 以下に管理機能のUI要素を追加 */}
    </Box>
  );
}
