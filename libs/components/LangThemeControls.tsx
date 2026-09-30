import { Box, IconButton, Stack } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useI18n } from "@/libs/locale";
import { useThemeMode } from "@/libs/theme-mode";
import { LOCALES } from "@/libs/types";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

const LangThemeControls = () => {
  const { locale, setLocale, m } = useI18n();
  const { mode, toggle } = useThemeMode();

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Stack
        role="group"
        aria-label="Language"
        sx={{
          display: "flex",
          flexDirection: "row",
          border: `1px solid ${COLORS.line}`,
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: COLORS.surface,
        }}
      >
        {LOCALES.map((code) => {
          const active = locale === code;
          return (
            <Box
              key={code}
              component="button"
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={active}
              sx={{
                height: 36,
                px: { xs: "7px", md: "9px" },
                border: 0,
                cursor: "pointer",
                backgroundColor: active ? COLORS.inverse : "transparent",
                color: active ? COLORS.inverseText : COLORS.body,
                fontFamily: FONT_FAMILY,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {code.toUpperCase()}
            </Box>
          );
        })}
      </Stack>
      <IconButton
        aria-label={mode === "dark" ? m.themeLight : m.themeDark}
        onClick={toggle}
        sx={{
          width: 36,
          height: 36,
          color: COLORS.ink,
          border: `1px solid ${COLORS.line}`,
          borderRadius: "10px",
          backgroundColor: COLORS.surface,
        }}
      >
        {mode === "dark" ? (
          <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
        ) : (
          <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Stack>
  );
};

export default LangThemeControls;
