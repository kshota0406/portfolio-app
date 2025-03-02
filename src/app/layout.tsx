"use client";

import { useState, useEffect, createContext, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  CssBaseline,
  useMediaQuery,
  Fab,
  Tooltip,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { getTheme } from "@/theme/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClerkProvider,
  UserButton,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";

// テーマモードのコンテキスト
type ThemeContextType = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // クライアントサイドでのみ実行されるようにuseStateの初期値を設定
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // 現在のパスを取得
  const pathname = usePathname();

  // クライアントサイドでのみ実行する
  useEffect(() => {
    // ブラウザのテーマ設定を確認
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode as "light" | "dark");
    } else {
      // ブラウザの設定に基づいてデフォルトテーマを設定
      setMode(prefersDarkMode ? "dark" : "light");
    }
    setMounted(true);
  }, []);

  // テーマ切り替え関数
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // テーマオブジェクト
  const theme = getTheme(mode);

  // 初期レンダリング時はサーバー側と同じスケルトンUIを表示
  if (!mounted) {
    return (
      <html lang="ja">
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="ja">
        <body>
          <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  bgcolor: "background.default",
                }}
              >
                <AppBar position="static" color="primary" elevation={0}>
                  <Toolbar>
                    {/* ロゴとサイト名 */}
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      <Link
                        href="/"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Portfolio
                      </Link>
                    </Typography>

                    {/* ナビゲーションリンク */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        color="inherit"
                        component={Link}
                        href="/"
                        sx={{
                          mr: 2,
                          borderBottom:
                            pathname === "/" ? "2px solid white" : "none",
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
                          borderBottom:
                            pathname === "/profile"
                              ? "2px solid white"
                              : "none",
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
                        {mode === "dark" ? (
                          <Brightness7Icon />
                        ) : (
                          <Brightness4Icon />
                        )}
                      </IconButton>

                      {/* ユーザー認証ボタン */}
                      <AuthButton />
                    </Box>
                  </Toolbar>
                </AppBar>

                {/* メインコンテンツ */}
                <Container
                  component="main"
                  sx={{ flexGrow: 1, py: 4, position: "relative" }}
                >
                  {children}
                  {/* 管理ページへのフローティングボタン */}
                  <Tooltip title="管理ページ">
                    <Fab
                      color="secondary"
                      aria-label="管理ページ"
                      component="a" // Linkの代わりにaタグを使用
                      href="/admin/projects" // 通常のURLを使用
                      onClick={(e) => {
                        // プログレッシブエンハンスメント: JSが有効ならハードリロード
                        e.preventDefault();
                        window.location.href = "/admin/projects";
                      }}
                      sx={{
                        position: "fixed",
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
                    mt: "auto",
                    backgroundColor: "background.paper",
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Container maxWidth="lg">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      © {new Date().getFullYear()} Portfolio. All rights
                      reserved.
                    </Typography>
                  </Container>
                </Box>
              </Box>
            </ThemeProvider>
          </ThemeContext.Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// 認証ボタンコンポーネント
function AuthButton() {
  const { isSignedIn, isLoaded } = useAuth();
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    isLoaded: false,
  });

  // 認証状態の変更を監視
  useEffect(() => {
    if (isLoaded) {
      setAuthState({ isSignedIn, isLoaded });
    }
  }, [isSignedIn, isLoaded]);

  // ローカルストレージから認証状態を復元（ページ遷移時の状態保持）
  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      try {
        const parsedState = JSON.parse(storedAuthState);
        setAuthState(parsedState);
      } catch (error) {
        console.error("認証状態の読み込みに失敗しました:", error);
      }
    }
  }, []);

  // 認証状態をローカルストレージに保存
  useEffect(() => {
    if (authState.isLoaded) {
      localStorage.setItem("authState", JSON.stringify(authState));
    }
  }, [authState]);

  if (!authState.isLoaded) {
    return null;
  }

  return (
    <Box sx={{ ml: 2 }}>
      {authState.isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton>
          <Button color="inherit" variant="outlined" size="small">
            ログイン
          </Button>
        </SignInButton>
      )}
    </Box>
  );
}
