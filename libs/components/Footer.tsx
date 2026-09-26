import { Box, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { COLORS, FONT_FAMILY, containerSx } from "@/libs/ui";
import { EMAIL, SOCIAL, contactMailto } from "@/libs/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        borderTop: `1px solid ${COLORS.line}`,
        pt: { xs: "64px", md: "96px" },
        pb: "calc(28px + env(safe-area-inset-bottom, 0px))",
        fontFamily: FONT_FAMILY,
      }}
    >
      <Box sx={containerSx}>
        <Typography
          component="p"
          sx={{
            m: 0,
            maxWidth: 760,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "clamp(32px, 8vw, 44px)", md: "64px" },
            fontWeight: 700,
            letterSpacing: "-0.048em",
            lineHeight: 1.12,
            color: COLORS.ink,
            wordBreak: "keep-all",
          }}
        >
          새로운 프로젝트,
          <br />
          편하게 연락 주세요.
        </Typography>

        <Stack
          sx={{
            mt: { xs: "28px", md: "36px" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: "12px",
          }}
        >
          <Box
            component="a"
            href={contactMailto()}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              height: 48,
              px: "18px",
              borderRadius: "12px",
              backgroundColor: COLORS.ink,
              color: "#fff",
              fontFamily: FONT_FAMILY,
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: 1,
              "&:hover": { backgroundColor: "#2c2a26" },
            }}
          >
            {EMAIL}
            <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box
            component="a"
            href="https://github.com/sharifjonovyusufjon"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              px: "18px",
              borderRadius: "12px",
              border: `1px solid ${COLORS.line}`,
              backgroundColor: COLORS.surface,
              color: COLORS.ink,
              fontFamily: FONT_FAMILY,
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: 1,
              "&:hover": { backgroundColor: "#fff", borderColor: "#cfc9be" },
            }}
          >
            GitHub
          </Box>
        </Stack>

        <Stack
          sx={{
            mt: { xs: "48px", md: "72px" },
            pt: "20px",
            borderTop: `1px solid ${COLORS.line}`,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: "16px", md: "24px" },
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT_FAMILY,
              fontSize: "13px",
              color: COLORS.muted,
            }}
          >
            © {year} Yusufjon · Seoul
          </Typography>

          <Stack
            component="nav"
            aria-label="Social links"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: { xs: "14px 18px", md: "22px" },
            }}
          >
            {SOCIAL.map((item) => (
              <Box
                key={item.label}
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  position: "relative",
                  fontFamily: FONT_FAMILY,
                  fontSize: "13px",
                  fontWeight: 550,
                  color: COLORS.ink,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -2,
                    height: "1px",
                    backgroundColor: "currentColor",
                    transform: "scaleX(0)",
                    transformOrigin: "right",
                    transition: "transform 280ms ease",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                    transformOrigin: "left",
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
