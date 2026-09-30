import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx } from "@/libs/ui";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const lineReveal = keyframes`
  from { transform: translateY(110%); }
  to   { transform: translateY(0); }
`;

const pulse = keyframes`
  0%   { transform: scale(1); opacity: 0.55; }
  80%  { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
`;

const enter = (delayMs: number) => ({
  animation: `${fadeUp} 700ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

const revealLineSx = (delayMs: number): SxProps<Theme> => ({
  display: "block",
  animation: `${lineReveal} 800ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

const Header = () => {
  const { m, tr } = useI18n();
  const { profile } = useContent();
  const lines = tr(profile.headline).split("\n").filter(Boolean);
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(m.mailSubject)}&body=${encodeURIComponent(m.mailBody)}`;

  return (
    <Box
      component="section"
      id="top"
      aria-labelledby="hero-title"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        pt: { xs: "28px", md: "56px" },
        pb: { xs: "64px", md: "96px" },
        fontFamily: FONT_FAMILY,
      }}
    >
      <Box
        sx={{
          ...containerSx,
          display: "block",
        }}
      >
        <Stack sx={{ minWidth: 0, maxWidth: 760, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              m: 0,
              mb: "18px",
              fontFamily: FONT_FAMILY,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: COLORS.muted,
              ...enter(80),
            }}
          >
            {tr(profile.eyebrow)} · {tr(profile.location)}
          </Typography>

          <Typography
            id="hero-title"
            component="h1"
            sx={{
              m: 0,
              fontFamily: FONT_FAMILY,
              fontSize: { xs: "clamp(36px, 10vw, 46px)", md: "clamp(52px, 4.2vw, 64px)" },
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: "-0.05em",
              color: COLORS.ink,
              wordBreak: "keep-all",
            }}
          >
            {lines.map((line, index) => (
              <Box key={`${line}-${index}`} component="span" sx={{ display: "block", overflow: "hidden", pb: "0.04em" }}>
                <Box component="span" sx={revealLineSx(100 + index * 90)}>
                  {line}
                </Box>
              </Box>
            ))}
          </Typography>

          <Typography
            component="p"
            sx={{
              m: 0,
              mt: { xs: "16px", md: "22px" },
              maxWidth: 540,
              fontFamily: FONT_FAMILY,
              fontSize: { xs: "15px", md: "17px" },
              fontWeight: 400,
              lineHeight: 1.7,
              letterSpacing: "-0.015em",
              color: COLORS.body,
              wordBreak: "keep-all",
              ...enter(420),
            }}
          >
            {tr(profile.description)}
          </Typography>

          <Typography
            sx={{
              m: 0,
              mt: "14px",
              fontFamily: FONT_FAMILY,
              fontSize: "13px",
              fontWeight: 550,
              letterSpacing: "-0.01em",
              color: COLORS.muted,
              ...enter(500),
            }}
          >
            {tr(profile.meta)}
          </Typography>

          <Stack
            sx={{
              mt: { xs: "24px", md: "28px" },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              alignItems: { xs: "stretch", sm: "center" },
              gap: "10px",
            }}
          >
            <Box
              component="a"
              href={mailto}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 46,
                px: "18px",
                borderRadius: "12px",
                backgroundColor: COLORS.inverse,
                color: COLORS.inverseText,
                fontFamily: FONT_FAMILY,
                fontSize: "15px",
                fontWeight: 600,
                lineHeight: 1,
                ...enter(620),
                "&:hover": { backgroundColor: COLORS.inverseHover },
              }}
            >
              {m.contact}
            </Box>
            <Box
              component="a"
              href="#work"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                height: 46,
                px: "18px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.line}`,
                backgroundColor: COLORS.surface,
                color: COLORS.ink,
                fontFamily: FONT_FAMILY,
                fontSize: "15px",
                fontWeight: 600,
                lineHeight: 1,
                ...enter(700),
                "&:hover": { backgroundColor: COLORS.hoverSurface, borderColor: COLORS.hoverLine },
              }}
            >
              {m.viewWork}
              <ArrowDownwardRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Stack
              sx={{
                height: 46,
                px: "14px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: { xs: "flex-start", sm: "center" },
                gap: "8px",
                borderRadius: "12px",
                backgroundColor: COLORS.greenSoft,
                ...enter(780),
              }}
            >
              <Box
                component="span"
                aria-hidden="true"
                sx={{
                  position: "relative",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: COLORS.green,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: COLORS.green,
                    animation: `${pulse} 2s ease-out infinite`,
                  },
                  [REDUCED_MOTION]: { "&::after": { animation: "none" } },
                }}
              />
              <Typography
                sx={{
                  fontFamily: FONT_FAMILY,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: COLORS.green,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {tr(profile.availability)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;
