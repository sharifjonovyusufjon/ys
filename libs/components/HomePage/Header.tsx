import { Box, Button, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const EMAIL = "yusufjon6727@gmail.com";

const FONT_FAMILY = [
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

const COLORS = {
  ink: "#111111",
  body: "#555555",
  green: "#1a8f3c",
  greenSoft: "#e9f9ec",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
`;

// Sarlavha qatori niqob ichidan pastdan chiqadi
const lineReveal = keyframes`
  from { transform: translateY(105%); }
  to   { transform: translateY(0); }
`;

// Sarlavhadagi kichik ikonka "sakrab" paydo bo'ladi
const iconPop = keyframes`
  0%   { transform: scale(0) rotate(-25deg); }
  70%  { transform: scale(1.15) rotate(6deg); }
  100% { transform: scale(1) rotate(0); }
`;

const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.5; }
  80%  { transform: scale(2.6); opacity: 0; }
  100% { transform: scale(2.6); opacity: 0; }
`;

const enter = (delayMs: number) => ({
  animation: `${fadeUp} 650ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const revealMaskSx: SxProps<Theme> = {
  display: "block",
  overflow: "hidden",
  pb: "0.06em",
};

const revealLineSx = (delayMs: number): SxProps<Theme> => ({
  display: "block",
  animation: `${lineReveal} 800ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

// Sarlavha ichidagi qora kvadrat ikonka (namunadagi kabi)
const titleIconSx: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "0.9em",
  height: "0.9em",
  borderRadius: "0.22em",
  backgroundColor: COLORS.ink,
  color: "#fff",
  verticalAlign: "-0.1em",
  animation: `${iconPop} 600ms ${EASE} 850ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
};

const contactButtonSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  flexShrink: 0,
  height: 40,
  minWidth: 100,
  px: 2.25,
  borderRadius: "10px",
  backgroundColor: COLORS.ink,
  color: "#fff",
  fontFamily: FONT_FAMILY,
  fontWeight: 600,
  fontSize: "14px",
  letterSpacing: "-0.01em",
  textTransform: "none",
  transition: `transform 200ms ${EASE}`,
  ...enter(750),
  "& .label, & .icon": {
    transition: `transform 350ms ${EASE}, opacity 250ms ease`,
  },
  "& .icon": {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translateY(100%)",
    opacity: 0,
  },
  "&:hover": { backgroundColor: COLORS.ink },
  "&:hover .label": { transform: "translateY(-120%)", opacity: 0 },
  "&:hover .icon": { transform: "translateY(0)", opacity: 1 },
  "&:active": { transform: "scale(0.97)" },
  "&:focus-visible": {
    outline: `2px solid ${COLORS.ink}`,
    outlineOffset: "3px",
  },
};

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

const Header = () => {
  const handleEmail = (): void => {
    const subject = encodeURIComponent("프로젝트 관련 문의드립니다.");
    const body = encodeURIComponent("안녕하세요~ ");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        px: { xs: "16px", sm: "24px" },
        pt: { xs: "32px", sm: "56px" },
        pb: { xs: "40px", sm: "64px" },
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: { xs: "370px", sm: "440px" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Sarlavha — ikki qator, ikkinchisida ikonka */}
        <Typography
          id="hero-title"
          component="h1"
          sx={{
            m: 0,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "clamp(22px, 7vw, 27px)", sm: "32px" },
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
            wordBreak: "keep-all",
          }}
        >
          <Box component="span" sx={revealMaskSx}>
            <Box component="span" sx={revealLineSx(150)}>
              안녕하세요, 저는 풀스택
            </Box>
          </Box>
          <Box component="span" sx={revealMaskSx}>
            <Box component="span" sx={revealLineSx(280)}>
              소프트웨어{" "}
              <Box component="span" aria-hidden="true" sx={titleIconSx}>
                <CodeRoundedIcon sx={{ fontSize: "0.62em" }} />
              </Box>{" "}
              엔지니어입니다.
            </Box>
          </Box>
        </Typography>

        {/* Tavsif — kichik kulrang matn, ichida kichik ikonka */}
        <Typography
          component="p"
          sx={{
            m: 0,
            mt: { xs: "12px", sm: "14px" },
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "13px", sm: "14px" },
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
            color: COLORS.body,
            wordBreak: "keep-all",
            ...enter(520),
          }}
        >
          실제 문제를 해결하는{" "}
          <PhoneIphoneRoundedIcon
            aria-hidden="true"
            sx={{
              fontSize: "1.1em",
              verticalAlign: "-0.18em",
              color: COLORS.body,
              mr: "1px",
            }}
          />
          모바일 및 웹 앱을 만드는 소프트웨어 엔지니어입니다.
        </Typography>

        {/* Tugma + holat badge'i yonma-yon */}
        <Stack
          sx={{
            mt: { xs: "20px", sm: "22px" },
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            onClick={handleEmail}
            disableElevation
            aria-label={`Send an email to ${EMAIL}`}
            sx={contactButtonSx}
          >
            <span className="label">연락하기</span>
            <span className="icon" aria-hidden="true">
              <MailOutlineRoundedIcon sx={{ fontSize: 20 }} />
            </span>
          </Button>

          <Stack
            sx={{
              height: 40,
              px: "14px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              borderRadius: "10px",
              backgroundColor: COLORS.greenSoft,
              ...enter(850),
            }}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                position: "relative",
                flexShrink: 0,
                width: 6,
                height: 6,
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
                fontSize: { xs: "12px", sm: "13px" },
                fontWeight: 500,
                color: COLORS.green,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              새로운 프로젝트에 참여 가능합니다
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
