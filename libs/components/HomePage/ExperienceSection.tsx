import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import SectionHeading from "@/libs/components/SectionHeading";
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx, sectionSx } from "@/libs/ui";

interface Company {
  name: string;
  Icon: SvgIconComponent;
  color: string;
  bg: string;
}

interface Experience {
  start: string;
  end: string | null;
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
      color: "#0e7a38",
      bg: "#e5f5eb",
    },
  },
  {
    start: "2025.05",
    end: "2025.07",
    role: "풀스택 개발자",
    company: {
      name: "HumbleBee AI",
      Icon: AutoAwesomeRoundedIcon,
      color: "#9a5b00",
      bg: "#fff3d6",
    },
  },
  {
    start: "2024.01",
    end: "2025.05",
    role: "미들 개발자",
    company: {
      name: "MIT ACADEMY",
      Icon: SchoolRoundedIcon,
      color: "#1d4ed8",
      bg: "#eef3ff",
    },
  },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%   { transform: scale(1); opacity: 0.5; }
  80%  { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
`;

const Period = ({ start, end }: Pick<Experience, "start" | "end">) => (
  <Stack
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      fontFamily: FONT_FAMILY,
      fontSize: { xs: "13px", md: "14px" },
      fontVariantNumeric: "tabular-nums",
      color: COLORS.muted,
      whiteSpace: "nowrap",
    }}
  >
    <time dateTime={start.replace(".", "-")}>{start}</time>
    <Box component="span" aria-hidden="true" sx={{ color: "#c8c2b6" }}>
      —
    </Box>
    {end ? (
      <time dateTime={end.replace(".", "-")}>{end}</time>
    ) : (
      <Stack
        component="span"
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "7px",
          color: COLORS.green,
          fontWeight: 650,
        }}
      >
        현재
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
      </Stack>
    )}
  </Stack>
);

const ExperienceSection = () => (
  <Box
    component="section"
    id="experience"
    aria-labelledby="experience-title"
    sx={{
      ...sectionSx,
      borderTop: `1px solid ${COLORS.line}`,
    }}
  >
    <Box sx={containerSx}>
      <SectionHeading
        id="experience-title"
        index="03"
        title="경력"
        sx={{ mb: { xs: "8px", md: "16px" } }}
      />

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
        {EXPERIENCES.map((exp, i) => {
          const { Icon } = exp.company;
          return (
            <Box
              component="li"
              key={`${exp.company.name}-${exp.start}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "220px minmax(0, 1fr) auto" },
                alignItems: "center",
                gap: { xs: "10px", md: "24px" },
                py: { xs: "22px", md: "28px" },
                borderBottom: `1px solid ${COLORS.line}`,
                animation: `${fadeUp} 650ms ${EASE} ${160 + i * 90}ms backwards`,
                [REDUCED_MOTION]: { animation: "none" },
              }}
            >
              <Period start={exp.start} end={exp.end} />

              <Typography
                component="h3"
                sx={{
                  m: 0,
                  fontFamily: FONT_FAMILY,
                  fontSize: { xs: "18px", md: "22px" },
                  fontWeight: 650,
                  letterSpacing: "-0.03em",
                  color: COLORS.ink,
                }}
              >
                {exp.role}
              </Typography>

              <Stack
                component="span"
                sx={{
                  justifySelf: { xs: "start", md: "end" },
                  display: "inline-flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                  height: 36,
                  px: "12px",
                  borderRadius: "10px",
                  backgroundColor: exp.company.bg,
                  color: exp.company.color,
                  fontFamily: FONT_FAMILY,
                  fontSize: "14px",
                  fontWeight: 650,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                <Icon aria-hidden="true" sx={{ fontSize: 16 }} />
                {exp.company.name}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  </Box>
);

export default ExperienceSection;
