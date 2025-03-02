'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Box, Container, Typography, Alert, Paper, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 認証状態を確認する関数（ダミー）
const checkAuth = (): Promise<boolean> => {
  // 認証機能を実装する前はtrueを返す
  return new Promise((resolve) => {
    // 読み込み中の表示を確認するための遅延
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const auth = await checkAuth();
        setIsAuthorized(auth);
      } catch (error) {
        console.error('認証エラー:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress />
          <Typography>認証を確認中...</Typography>
        </Box>
      </Container>
    );
  }

  if (!isAuthorized) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            このページへのアクセス権限がありません。
          </Alert>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/')}
          >
            トップページに戻る
          </Button>
        </Box>
      </Container>
    );
  }

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
            onClick={() => router.push('/')}
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