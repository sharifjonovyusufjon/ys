import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx } from "@/libs/ui";
import { contactMailto } from "@/libs/site";

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
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(280px, 0.85fr)" },
          gap: { xs: "36px", md: "64px" },
          alignItems: "center",
        }}
      >
        <Stack sx={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
          <Stack
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "row",
              alignItems: "center",
              gap: "14px",
              mb: "22px",
              ...enter(80),
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 64,
                height: 80,
                flexShrink: 0,
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#e7e2d8",
              }}
            >
              <Image
                src="/my.png"
                alt=""
                fill
                sizes="64px"
                priority
                style={{ objectFit: "cover", objectPosition: "center 18%" }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: FONT_FAMILY,
                  fontSize: "13px",
                  fontWeight: 650,
                  letterSpacing: "-0.01em",
                  color: COLORS.ink,
                }}
              >
                풀스택 소프트웨어 엔지니어
              </Typography>
              <Typography
                sx={{
                  mt: "2px",
                  fontFamily: FONT_FAMILY,
                  fontSize: "13px",
                  color: COLORS.muted,
                }}
              >
                서울, 대한민국
              </Typography>
            </Box>
          </Stack>

          <Typography
            sx={{
              display: { xs: "none", md: "block" },
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
            풀스택 소프트웨어 엔지니어 · 서울
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
            {["안녕하세요,", "저는 풀스택", "소프트웨어", "엔지니어입니다."].map((line, index) => (
              <Box
                key={line}
                component="span"
                sx={{ display: "block", overflow: "hidden", pb: "0.04em" }}
              >
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
            실제 문제를 해결하는 모바일 및 웹 앱을 만드는 소프트웨어 엔지니어입니다.
            프론트엔드와 백엔드를 함께 설계하고, 유지하기 쉬운 제품으로 만듭니다.
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
            서울 · D-10 구직 비자 · 한국어 5단계
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
              href={contactMailto()}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 46,
                px: "18px",
                borderRadius: "12px",
                backgroundColor: COLORS.ink,
                color: "#fff",
                fontFamily: FONT_FAMILY,
                fontSize: "15px",
                fontWeight: 600,
                lineHeight: 1,
                ...enter(620),
                "&:hover": { backgroundColor: "#2c2a26" },
              }}
            >
              연락하기
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
                "&:hover": { backgroundColor: "#fff", borderColor: "#cfc9be" },
              }}
            >
              작업 보기
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
                새로운 프로젝트에 참여 가능합니다
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            justifySelf: "end",
            width: "100%",
            maxWidth: 420,
            ...enter(200),
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              borderRadius: "28px",
              overflow: "hidden",
              backgroundColor: "#e7e2d8",
              boxShadow: "0 30px 70px -40px rgba(26, 25, 22, 0.55)",
            }}
          >
            <Image
              src="/my.png"
              alt="Sharifjonov Yusufjon"
              fill
              sizes="(max-width: 900px) 0px, 420px"
              priority
              style={{ objectFit: "cover", objectPosition: "center 15%" }}
            />
          </Box>
          <Typography
            sx={{
              mt: "14px",
              fontFamily: FONT_FAMILY,
              fontSize: "13px",
              color: COLORS.muted,
              letterSpacing: "-0.01em",
            }}
          >
            Sharifjonov Yusufjon · Software Engineer
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
