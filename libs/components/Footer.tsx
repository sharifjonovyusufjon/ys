import { Box, Link, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FooterLinkItem {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const FOOTER_LINKS: readonly FooterLinkItem[] = [
  { label: "GitHub", href: "https://github.com/sharifjonovyusufjon" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/",
  },
  { label: "Telegram", href: "https://t.me/YusufjonSharifjonov" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sharifjonovyusufjon/",
  },
];

// Footer'ning asosiy balandligi. iPhone'dagi pastki "home bar" joyi bunga qo'shimcha qo'shiladi.
const FOOTER_HEIGHT = 60;
const SAFE_BOTTOM = "env(safe-area-inset-bottom, 0px)";

const COLORS = {
  ink: "#242424",
  muted: "#6b6b6b",
  border: "#C4C4C4",
  surface: "rgba(255, 255, 255, 0.8)",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/*  "backwards" — animatsiya tugagach element o'z stiliga qaytadi,     */
/*  shuning uchun hover effektlari bilan to'qnashmaydi.                */
/* ------------------------------------------------------------------ */

// Footer pastdan ko'tarilib chiqadi
const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;

// Yuqoridagi chiziq markazdan ikki tomonga chiziladi
const lineDraw = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const itemIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const animatedItem = (delayMs: number) => ({
  animation: `${itemIn} 450ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const FooterLink = ({
  label,
  href,
  delay,
}: FooterLinkItem & { delay: number }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    underline="none"
    sx={{
      position: "relative",
      flexShrink: 0,
      py: "4px",
      fontSize: { xs: "11px", sm: "12px" },
      color: COLORS.ink,
      transition: "color 200ms ease",
      ...animatedItem(delay),
      // Hover'da chapdan o'ngga chiziladigan pastki chiziq
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "1px",
        backgroundColor: "currentColor",
        transform: "scaleX(0)",
        transformOrigin: "right",
        transition: `transform 300ms ${EASE}`,
      },
      "&:hover::after, &:focus-visible::after": {
        transform: "scaleX(1)",
        transformOrigin: "left",
      },
      "&:focus-visible": {
        outline: `2px solid ${COLORS.ink}`,
        outlineOffset: "3px",
        borderRadius: "2px",
      },
      [REDUCED_MOTION]: {
        animation: "none",
        "&::after": { transition: "none" },
      },
    }}
  >
    {label}
  </Link>
);

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Pastdagi fixed footer ostida sahifaning oxirgi kontenti yopilib qolmasligi uchun joy */}
      <Box
        aria-hidden="true"
        sx={{ height: `calc(${FOOTER_HEIGHT}px + ${SAFE_BOTTOM})` }}
      />

      {/* Ekranning pastiga qotib turadigan footer. Kontent scroll paytida uning tagidan o'tadi. */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1100,
          boxSizing: "border-box",
          // Har qanday qurilmada ekran pastiga yopishadi; iPhone home bar joyini ham hisobga oladi
          height: `calc(${FOOTER_HEIGHT}px + ${SAFE_BOTTOM})`,
          pb: SAFE_BOTTOM,
          px: { xs: "16px", sm: "24px" },
          display: "flex",
          justifyContent: "center",
          backgroundColor: COLORS.surface,
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
          animation: `${slideUp} 600ms ${EASE} 200ms backwards`,
          [REDUCED_MOTION]: { animation: "none" },
        }}
      >
        <Stack
          sx={{
            position: "relative",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: { xs: "370px", sm: "440px" },
            minWidth: 0,
            height: FOOTER_HEIGHT,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1.5, sm: 2 },
            // Yuqoridagi chegara chizig'i (animatsiyali)
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: COLORS.border,
              transformOrigin: "center",
              animation: `${lineDraw} 700ms ${EASE} 450ms backwards`,
            },
            [REDUCED_MOTION]: {
              "&::before": { animation: "none" },
            },
          }}
        >
          <Typography
            sx={{
              flexShrink: 0,
              fontSize: { xs: "11px", sm: "12px" },
              color: COLORS.muted,
              whiteSpace: "nowrap",
              ...animatedItem(600),
            }}
          >
            © {year} Yusufjon
          </Typography>

          <Stack
            component="nav"
            aria-label="Social links"
            sx={{
              minWidth: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: { xs: "12px", sm: "18px" },
            }}
          >
            {FOOTER_LINKS.map((item, i) => (
              <FooterLink key={item.label} {...item} delay={680 + i * 70} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;