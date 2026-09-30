import { Box, Stack, Typography } from "@mui/material";
import SectionHeading from "@/libs/components/SectionHeading";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { TECH_ICONS } from "@/libs/tech-icons";
import { COLORS, EASE, FONT_FAMILY, containerSx, sectionSx } from "@/libs/ui";

const INKISH = new Set(["#111111", "#000000", "#010101", "#111", "#181717"]);

const Technologies = () => {
  const { m, tr } = useI18n();
  const { techGroups } = useContent();

  return (
    <Box component="section" id="stack" aria-labelledby="tech-title" sx={{ ...sectionSx, borderTop: `1px solid ${COLORS.line}` }}>
      <Box sx={containerSx}>
        <SectionHeading id="tech-title" index="04" title={m.sections.stack} sx={{ mb: { xs: "28px", md: "40px" } }} />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: "14px", md: "18px" } }}>
          {techGroups.map((group) => {
            const title = tr(group.title);
            return (
              <Box
                key={group._id ?? title}
                sx={{
                  p: { xs: "18px", md: "22px" },
                  borderRadius: "20px",
                  border: `1px solid ${COLORS.line}`,
                  backgroundColor: COLORS.surface,
                }}
              >
                <Stack
                  sx={{
                    mb: "16px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      m: 0,
                      fontFamily: FONT_FAMILY,
                      fontSize: { xs: "16px", md: "18px" },
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: COLORS.ink,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "12px", fontVariantNumeric: "tabular-nums", color: COLORS.muted }}>
                    {group.items.length}
                  </Typography>
                </Stack>

                <Box
                  component="ul"
                  aria-label={title}
                  sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px" }}
                >
                  {group.items.map((tech) => {
                    const name = tr(tech.name);
                    const Icon = TECH_ICONS[tech.icon];
                    const color = INKISH.has(tech.color.toLowerCase()) ? "currentColor" : tech.color;
                    return (
                      <Stack
                        component="li"
                        key={`${tech.icon}-${name}`}
                        sx={{
                          display: "inline-flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "8px",
                          height: 38,
                          px: "12px",
                          borderRadius: "10px",
                          border: `1px solid ${COLORS.line}`,
                          backgroundColor: COLORS.chip,
                          fontFamily: FONT_FAMILY,
                          fontSize: "13px",
                          fontWeight: 550,
                          letterSpacing: "-0.01em",
                          color: COLORS.ink,
                          whiteSpace: "nowrap",
                          transition: `transform 250ms ${EASE}, border-color 200ms ease`,
                          "&:hover": {
                            transform: "translateY(-2px)",
                            borderColor: COLORS.hoverLine,
                          },
                        }}
                      >
                        <Box component="span" aria-hidden="true" sx={{ display: "flex", fontSize: 16, color, lineHeight: 0 }}>
                          {Icon ? <Icon /> : <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />}
                        </Box>
                        {name}
                      </Stack>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Technologies;
