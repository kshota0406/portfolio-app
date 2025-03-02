"use client";

import { ReactNode } from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            管理ページ
          </Typography>
          <Typography color="text.secondary" paragraph>
            プロジェクトの追加・編集・削除が行えます。
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/")}
            sx={{ mr: 2 }}
          >
            トップページに戻る
          </Button>
        </Paper>
        {children}
      </Box>
    </Container>
  );
}
