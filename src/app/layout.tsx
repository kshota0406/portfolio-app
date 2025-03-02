'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getTheme } from '@/theme/theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fab, Tooltip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// テーマモードのコンテキスト
type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // クライアントサイドでのみ実行されるようにuseStateの初期値を設定
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  
  // 現在のパスを取得
  const pathname = usePathname();
  
  // クライアントサイドでのみ実行する
  useEffect(() => {
    // ブラウザのテーマ設定を確認
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode as 'light' | 'dark');
    } else {
      // ブラウザの設定に基づいてデフォルトテーマを設定
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);
  
  // テーマ切り替え関数
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };
  
  // テーマオブジェクト
  const theme = getTheme(mode);

  // クライアントサイドでマウントされるまで基本的なレイアウトのみを表示
  if (!mounted) {
    return (
      <html lang="ja">
        <body>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
              {children}
            </Container>
          </Box>
        </body>
      </html>
    );
  }

  return (
    <html lang="ja">
      <body>
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
              }}
            >
              <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                  {/* ロゴとサイト名 */}
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                      Portfolio
                    </Link>
                  </Typography>
                  
                  {/* ナビゲーションリンク */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                      color="inherit" 
                      component={Link} 
                      href="/"
                      sx={{
                        mr: 2,
                        borderBottom: pathname === '/' ? '2px solid white' : 'none',
                      }}
                    >
                      <HomeIcon />
                    </IconButton>
                    <IconButton 
                      color="inherit" 
                      component={Link} 
                      href="/profile"
                      sx={{
                        mr: 2,
                        borderBottom: pathname === '/profile' ? '2px solid white' : 'none',
                      }}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                    <IconButton 
                      color="inherit" 
                      component="a"
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mr: 2 }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    
                    {/* テーマ切り替えボタン */}
                    <IconButton color="inherit" onClick={toggleTheme}>
                      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              
{/* メインコンテンツ */}
<Container component="main" sx={{ flexGrow: 1, py: 4, position: 'relative' }}>
  {children}
  
  {/* 管理ページへのフローティングボタン */}
  <Tooltip title="管理ページ">
    <Fab
      color="secondary"
      aria-label="管理ページ"
      component={Link}
      href="/admin/projects"
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
      }}
    >
      <AdminPanelSettingsIcon />
    </Fab>
  </Tooltip>
</Container>
              
              {/* フッター */}
              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: 'auto',
                  backgroundColor: 'background.paper',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Container maxWidth="lg">
                  <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                  </Typography>
                </Container>
              </Box>
            </Box>
          </ThemeProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}