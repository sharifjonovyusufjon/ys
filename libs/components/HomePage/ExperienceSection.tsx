import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import SectionHeading from "@/libs/components/SectionHeading";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx, sectionSx } from "@/libs/ui";

const ICONS: SvgIconComponent[] = [LaptopMacRoundedIcon, AutoAwesomeRoundedIcon, SchoolRoundedIcon];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%   { transform: scale(1); opacity: 0.5; }
  80%  { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
`;

const ExperienceSection = () => {
  const { m, tr } = useI18n();
  const { experiences } = useContent();

  return (
    <Box
      component="section"
      id="experience"
      aria-labelledby="experience-title"
      sx={{ ...sectionSx, borderTop: `1px solid ${COLORS.line}` }}
    >
      <Box sx={containerSx}>
        <SectionHeading id="experience-title" index="03" title={m.sections.experience} sx={{ mb: { xs: "8px", md: "16px" } }} />

        <Stack component="ol" sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
          {experiences.map((exp, i) => {
            const Icon = ICONS[i] ?? LaptopMacRoundedIcon;
            const company = tr(exp.company);
            return (
              <Box
                component="li"
                key={exp._id ?? `${company}-${exp.start}`}
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
                  <time dateTime={exp.start.replace(".", "-")}>{exp.start}</time>
                  <Box component="span" aria-hidden="true" sx={{ color: COLORS.muted }}>
                    —
                  </Box>
                  {exp.end ? (
                    <time dateTime={exp.end.replace(".", "-")}>{exp.end}</time>
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
                      {m.present}
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
                  {tr(exp.role)}
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
                    backgroundColor: exp.bg,
                    color: exp.color,
                    fontFamily: FONT_FAMILY,
                    fontSize: "14px",
                    fontWeight: 650,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon aria-hidden="true" sx={{ fontSize: 16 }} />
                  {company}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default ExperienceSection;
