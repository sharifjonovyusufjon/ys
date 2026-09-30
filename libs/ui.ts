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
  bg: "var(--bg)",
  surface: "var(--surface)",
  ink: "var(--ink)",
  body: "var(--body)",
  muted: "var(--muted)",
  line: "var(--line)",
  green: "var(--green)",
  greenSoft: "var(--green-soft)",
  blue: "var(--blue)",
  blueSoft: "var(--blue-soft)",
  blueTrack: "var(--blue-track)",
  chip: "var(--chip)",
  inverse: "var(--inverse)",
  inverseText: "var(--inverse-text)",
  inverseHover: "var(--inverse-hover)",
  nav: "var(--nav)",
  navScrolled: "var(--nav-scrolled)",
  pill: "var(--pill)",
  portrait: "var(--portrait)",
  iconBg: "var(--icon-bg)",
  hoverSurface: "var(--hover-surface)",
  hoverLine: "var(--hover-line)",
  dot: "var(--dot)",
  shadow: "var(--shadow)",
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
