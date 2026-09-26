import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

interface SectionHeadingProps {
  id?: string;
  index: string;
  title: string;
  sx?: SxProps<Theme>;
}

const SectionHeading = ({ id, index, title, sx }: SectionHeadingProps) => (
  <Box sx={sx}>
    <Typography
      sx={{
        m: 0,
        mb: "10px",
        fontFamily: FONT_FAMILY,
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.14em",
        color: COLORS.muted,
      }}
    >
      {index}
    </Typography>
    <Typography
      id={id}
      component="h2"
      sx={{
        m: 0,
        fontFamily: FONT_FAMILY,
        fontSize: { xs: "32px", md: "44px" },
        fontWeight: 700,
        letterSpacing: "-0.045em",
        lineHeight: 1.12,
        color: COLORS.ink,
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default SectionHeading;
