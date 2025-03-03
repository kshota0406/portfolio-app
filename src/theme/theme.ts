import { createTheme, Theme, PaletteMode } from "@mui/material";

// テーマカラーの定義
const lightThemeColors = {
  primary: {
    main: "#3f51b5",
    light: "#757de8",
    dark: "#002984",
    contrastText: "#fff",
  },
  secondary: {
    main: "#f50057",
    light: "#ff4081",
    dark: "#c51162",
    contrastText: "#fff",
  },
  background: {
    default: "#fafafa",
    paper: "#fff",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
};

const darkThemeColors = {
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#42a5f5",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  secondary: {
    main: "#f48fb1",
    light: "#f8bbd0",
    dark: "#ec407a",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#fff",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
};

// テーマ設定の取得関数
export const getThemeOptions = (mode: PaletteMode) => {
  const colors = mode === "light" ? lightThemeColors : darkThemeColors;

  return {
    palette: {
      mode,
      ...colors,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          containedPrimary: {
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? lightThemeColors.primary.dark
                  : darkThemeColors.primary.dark,
            },
          },
          containedSecondary: {
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? lightThemeColors.secondary.dark
                  : darkThemeColors.secondary.dark,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "light"
                ? "0px 3px 8px rgba(100, 105, 135, 0.1)"
                : "0px 3px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow:
                mode === "light"
                  ? "0px 6px 12px rgba(100, 105, 135, 0.2)"
                  : "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          },
        },
      },
    },
  };
};

// カスタムテーマの生成
export const getTheme = (mode: PaletteMode): Theme => {
  return createTheme(getThemeOptions(mode));
};
