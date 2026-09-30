import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/libs/theme";

const KEY = "ys-theme";

type Mode = "light" | "dark";

type ThemeModeValue = {
  mode: Mode;
  toggle: () => void;
};

const ThemeModeContext = createContext<ThemeModeValue | null>(null);

const applyMode = (mode: Mode): void => {
  document.documentElement.dataset.theme = mode;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", mode === "dark" ? "#12110f" : "#f4f1eb");
};

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const saved: Mode = localStorage.getItem(KEY) === "dark" ? "dark" : "light";
    setMode(saved);
    applyMode(saved);
  }, []);

  const toggle = (): void => {
    setMode((current) => {
      const next: Mode = current === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      applyMode(next);
      return next;
    });
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export const useThemeMode = (): ThemeModeValue => {
  const value = useContext(ThemeModeContext);
  if (!value) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return value;
};
