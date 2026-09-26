import type { SxProps, Theme } from "@mui/material/styles";

export const FONT_FAMILY = [
  '"Pretendard Variable"',
  "Pretendard",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Apple SD Gothic Neo"',
  '"Noto Sans KR"',
  '"Malgun Gothic"',
  "system-ui",
  "sans-serif",
].join(", ");

export const COLORS = {
  bg: "#f4f1eb",
  surface: "#fffcf8",
  ink: "#1a1916",
  body: "#5e5a54",
  muted: "#8d897f",
  line: "#e4dfd6",
  green: "#0e7a38",
  greenSoft: "#e5f5eb",
  blue: "#1d4ed8",
  blueSoft: "#eef3ff",
  blueTrack: "#d9e4fb",
} as const;

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const NAV_HEIGHT = { xs: 64, md: 72 };

export const containerSx: SxProps<Theme> = {
  boxSizing: "border-box",
  width: "100%",
  maxWidth: 1120,
  mx: "auto",
  px: { xs: "20px", sm: "28px", md: "40px" },
};

export const sectionSx: SxProps<Theme> = {
  boxSizing: "border-box",
  width: "100%",
  py: { xs: "72px", md: "112px" },
  scrollMarginTop: { xs: "72px", md: "88px" },
  fontFamily: FONT_FAMILY,
};
