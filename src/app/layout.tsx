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
import LoginIcon from "@mui/icons-material/Login";
import { getTheme } from "@/theme/theme";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClerkProvider, UserButton, useAuth } from "@clerk/nextjs";

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

    // Supabase ストレージの初期化
    const initializeSupabaseStorage = async () => {
      try {
        const { initializeStorage } = await import("@/lib/supabaseStorage");
        await initializeStorage();
        console.log("Supabaseストレージの初期化が完了しました");
      } catch (error) {
        console.error("Supabaseストレージの初期化に失敗しました:", error);
      }
    };

    initializeSupabaseStorage();

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
                  {/* 管理ページへのフローティングボタン - 認証されている場合のみ表示 */}
                  <AdminFabButton />
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
  const router = useRouter();
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

  if (authState.isSignedIn) {
    return (
      <Box sx={{ ml: 2 }}>
        <UserButton afterSignOutUrl="/" />
      </Box>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<LoginIcon />}
        onClick={() => router.push("/sign-in")}
        sx={{ ml: 2 }}
      >
        ログイン
      </Button>
    );
  }
}

// 管理ページへのフローティングボタンコンポーネント
function AdminFabButton() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // ログインしていない場合は何も表示しない
  if (!isSignedIn) {
    return null;
  }

  return (
    <Tooltip title="管理ページ">
      <Fab
        color="secondary"
        aria-label="管理ページ"
        onClick={() => router.push("/admin/projects")}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        <AdminPanelSettingsIcon />
      </Fab>
    </Tooltip>
  );
}
