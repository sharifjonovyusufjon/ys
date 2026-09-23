import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";

/* ------------------------------------------------------------------ */
/*  Data — ish tajribasi (eng yangisi birinchi)                        */
/* ------------------------------------------------------------------ */

interface Company {
  name: string;
  logo?: string; // /public ichidagi logo (ixtiyoriy). Bo'lmasa Icon ishlatiladi
  Icon: SvgIconComponent;
  color: string; // badge matni va ikonka rangi
  bg: string; // badge foni
}

interface Experience {
  start: string; // "YYYY.MM"
  end: string | null; // null = hozirgacha
  role: string;
  company: Company;
}

export const EXPERIENCES: Experience[] = [
  {
    start: "2025.07",
    end: null,
    role: "풀스택 개발자",
    company: {
      name: "프리랜서",
      Icon: LaptopMacRoundedIcon,
      color: "#1a8f3c",
      bg: "#e9f9ec",
    },
  },
  {
    start: "2025.05",
    end: "2025.07",
    role: "풀스택 개발자",
    company: {
      name: "HumbleBee AI",
      Icon: AutoAwesomeRoundedIcon,
      color: "#a15c00",
      bg: "#fff4d9",
    },
  },
  {
    start: "2024.01",
    end: "2025.05",
    role: "주니어 웹 개발자",
    company: {
      name: "MIT ACADEMY",
      Icon: SchoolRoundedIcon,
      color: "#1f5fd6",
      bg: "#eaf1ff",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const FONT_FAMILY = [
  '"Pretendard Variable"',
  "Pretendard",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Apple SD Gothic Neo"',
  '"Noto Sans KR"',
  "system-ui",
  "sans-serif",
].join(", ");

const COLORS = {
  ink: "#111111",
  muted: "#9a9a9a",
  divider: "#efefef",
  hover: "#fafafa",
  green: "#1a8f3c",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.5; }
  80%  { transform: scale(2.6); opacity: 0; }
  100% { transform: scale(2.6); opacity: 0; }
`;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const Period = ({ start, end }: Pick<Experience, "start" | "end">) => (
  <Stack
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "6px",
      fontFamily: FONT_FAMILY,
      fontSize: { xs: "12px", sm: "13px" },
      fontVariantNumeric: "tabular-nums",
      color: COLORS.muted,
      whiteSpace: "nowrap",
    }}
  >
    <time dateTime={start.replace(".", "-")}>{start}</time>
    <span aria-hidden="true">–</span>
    {end ? (
      <time dateTime={end.replace(".", "-")}>{end}</time>
    ) : (
      <Stack
        component="span"
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "6px",
          color: COLORS.green,
          fontWeight: 600,
        }}
      >
        현재
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            position: "relative",
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
      </Stack>
    )}
  </Stack>
);

const CompanyBadge = ({ name, logo, Icon, color, bg }: Company) => (
  <Stack
    component="span"
    className="company-badge"
    sx={{
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "6px",
      height: 30,
      px: "10px",
      borderRadius: "8px",
      backgroundColor: bg,
      color,
      fontFamily: FONT_FAMILY,
      fontSize: { xs: "13px", sm: "14px" },
      fontWeight: 600,
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap",
      boxShadow: `inset 0 0 0 1px ${color}1f`,
      transition: `transform 300ms ${EASE}, box-shadow 300ms ease`,
      "& .badge-icon": { transition: `transform 400ms ${EASE}` },
    }}
  >
    {logo ? (
      <Box
        className="badge-icon"
        sx={{
          position: "relative",
          width: 16,
          height: 16,
          borderRadius: "4px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={logo}
          alt=""
          fill
          sizes="16px"
          style={{ objectFit: "cover" }}
        />
      </Box>
    ) : (
      <Icon className="badge-icon" aria-hidden="true" sx={{ fontSize: 16 }} />
    )}
    {name}
  </Stack>
);

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

const ExperienceSection = () => (
  <Box
    component="section"
    aria-labelledby="experience-title"
    sx={{
      boxSizing: "border-box",
      width: "100%",
      px: { xs: "16px", sm: "24px" },
      py: { xs: "32px", sm: "48px" },
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
      }}
    >
      <Typography
        id="experience-title"
        component="h2"
        sx={{
          m: 0,
          mb: { xs: "16px", sm: "20px" },
          fontFamily: FONT_FAMILY,
          fontSize: { xs: "22px", sm: "26px" },
          fontWeight: 700,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
          animation: `${fadeUp} 650ms ${EASE} 100ms backwards`,
          [REDUCED_MOTION]: { animation: "none" },
        }}
      >
        경력
      </Typography>

      <Stack
        component="ol"
        sx={{
          m: 0,
          p: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {EXPERIENCES.map((exp, i) => (
          <Box
            component="li"
            key={`${exp.company.name}-${exp.start}`}
            sx={{
              display: "grid",
              // Telefonda davr tepada, kompyuterda chapda (namunadagi kabi)
              gridTemplateColumns: { xs: "1fr", sm: "150px 1fr" },
              alignItems: "center",
              rowGap: "8px",
              columnGap: "16px",
              py: { xs: "14px", sm: "12px" },
              px: "10px",
              mx: "-10px",
              borderRadius: "12px",
              borderBottom:
                i < EXPERIENCES.length - 1
                  ? `1px solid ${COLORS.divider}`
                  : "none",
              transition: "background-color 250ms ease",
              animation: `${fadeUp} 650ms ${EASE} ${220 + i * 110}ms backwards`,
              "&:hover": { backgroundColor: COLORS.hover },
              "&:hover .company-badge": {
                transform: "translateX(3px)",
                boxShadow: "0 6px 14px -10px rgba(0, 0, 0, 0.35)",
              },
              "&:hover .badge-icon": { transform: "rotate(-10deg) scale(1.1)" },
              [REDUCED_MOTION]: { animation: "none" },
            }}
          >
            <Period start={exp.start} end={exp.end} />

            <Stack
              sx={{
                minWidth: 0,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: FONT_FAMILY,
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: COLORS.ink,
                }}
              >
                {exp.role}
              </Typography>
              <CompanyBadge {...exp.company} />
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  </Box>
);

export default ExperienceSection;
