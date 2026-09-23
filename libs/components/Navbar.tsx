import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Tooltip,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SocialLinkItem {
  label: string;
  href: string;
  Icon: SvgIconComponent;
}

interface SocialLinkProps extends SocialLinkItem {
  delay: number;
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const EMAIL = "yusufjon6727@gmail.com";

const SOCIAL_LINKS: readonly SocialLinkItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/sharifjonovyusufjon",
    Icon: GitHubIcon,
  },
  {
    label: "Telegram",
    href: "https://t.me/YusufjonSharifjonov",
    Icon: TelegramIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sharifjonovyusufjon/",
    Icon: InstagramIcon,
  },
];

const NAVBAR_HEIGHT = 90;

const COLORS = {
  ink: "#1a1a1a",
  border: "#C4C4C4",
  surface: "rgba(255, 255, 255, 0.72)",
  hover: "rgba(26, 26, 26, 0.06)",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/*  "backwards" fill-mode: animatsiya tugagach element o'z stiliga     */
/*  qaytadi, shuning uchun hover'dagi transform'lar ham ishlaydi.      */
/* ------------------------------------------------------------------ */

const pillOpen = keyframes`
  0%   { opacity: 0; transform: scaleX(0.35) translateY(-12px); }
  60%  { opacity: 1; }
  100% { opacity: 1; transform: scaleX(1) translateY(0); }
`;

const itemIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const dividerGrow = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

const animatedItem = (delayMs: number) => ({
  animation: `${itemIn} 500ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

const focusRing = (offset = 2) => ({
  "&:focus-visible": {
    outline: `2px solid ${COLORS.ink}`,
    outlineOffset: `${offset}px`,
  },
});

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

const useScrolled = (threshold = 8): boolean => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const NavDivider = () => (
  <Divider
    orientation="vertical"
    flexItem
    sx={{
      my: "12px",
      borderColor: COLORS.border,
      transformOrigin: "center",
      animation: `${dividerGrow} 400ms ${EASE} 300ms backwards`,
      [REDUCED_MOTION]: { animation: "none" },
    }}
  />
);

const SocialLink = ({ label, href, Icon, delay }: SocialLinkProps) => (
  <Tooltip title={label} arrow enterDelay={300}>
    <IconButton
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      sx={{
        width: { xs: 30, sm: 36 },
        height: { xs: 30, sm: 36 },
        flexShrink: 0,
        color: COLORS.ink,
        borderRadius: "8px",
        transition: `transform 250ms ${EASE}, background-color 200ms ease`,
        ...animatedItem(delay),
        ...focusRing(),
        "&:hover": {
          backgroundColor: COLORS.hover,
          transform: "translateY(-2px)",
        },
        "&:active": { transform: "scale(0.92)" },
      }}
    >
      <Icon sx={{ fontSize: { xs: 22, sm: 26 } }} />
    </IconButton>
  </Tooltip>
);

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

const contactButtonSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  flexShrink: 0,
  height: { xs: 36, sm: 40 },
  minWidth: { xs: 84, sm: 104 },
  px: { xs: 1.5, sm: 2 },
  borderRadius: "9px",
  backgroundColor: COLORS.ink,
  color: "#fff",
  fontWeight: 600,
  fontSize: { xs: 13, sm: 14 },
  letterSpacing: "0.01em",
  textTransform: "none",
  ...animatedItem(700),
  ...focusRing(3),
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
  "&:active": { transform: "scale(0.96)" },
};

const Navbar = () => {
  const scrolled = useScrolled();

  const handleEmail = (): void => {
    const subject = encodeURIComponent("프로젝트 관련 문의드립니다.");
    const body = encodeURIComponent("안녕하세요~ ");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Ekranga qotib turadigan header. Sahifa kontenti scroll paytida uning tagidan o'tadi. */}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          boxSizing: "border-box",
          height: NAVBAR_HEIGHT,
          px: { xs: "16px", sm: "24px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Navbar atrofidagi shaffof joy ostidagi kontentni bosishga xalaqit bermasin
          pointerEvents: "none",
        }}
      >
        <Stack
          component="nav"
          aria-label="Main navigation"
          sx={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: { xs: "370px", sm: "440px" },
            minWidth: 0,
            height: { xs: 50, sm: 56 },
            border: `1px solid ${COLORS.border}`,
            borderRadius: "12px",
            backgroundColor: COLORS.surface,
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
            boxShadow: scrolled
              ? "0 8px 24px -12px rgba(26, 26, 26, 0.25)"
              : "0 0 0 rgba(0, 0, 0, 0)",
            transformOrigin: "center",
            animation: `${pillOpen} 700ms ${EASE} backwards`,
            transition: "box-shadow 300ms ease",
            [REDUCED_MOTION]: { animation: "none", transition: "none" },
          }}
        >
          {/* Home */}
          <Box
            sx={{
              flexShrink: 0,
              px: { xs: 1.25, sm: 2 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              aria-label="Home"
              sx={{
                display: "flex",
                color: COLORS.ink,
                borderRadius: "8px",
                p: 0.5,
                transition: `transform 350ms ${EASE}`,
                ...animatedItem(350),
                ...focusRing(),
                "&:hover": { transform: "rotate(-8deg) scale(1.08)" },
              }}
            >
              <RoofingOutlinedIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
            </Link>
          </Box>

          <NavDivider />

          {/* Social */}
          <Stack
            sx={{
              flex: 1,
              minWidth: 0,
              px: { xs: 0.5, sm: 1 },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {SOCIAL_LINKS.map((item, i) => (
              <SocialLink key={item.label} {...item} delay={420 + i * 70} />
            ))}
          </Stack>

          <NavDivider />

          {/* Contact */}
          <Box
            sx={{
              flexShrink: 0,
              px: { xs: 1, sm: 1.25 },
              display: "flex",
              alignItems: "center",
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
                <MailOutlineRoundedIcon sx={{ fontSize: 22 }} />
              </span>
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* Header fixed bo'lgani uchun sahifa boshidagi kontent uning ostida yopilib qolmasligi uchun joy */}
      <Box aria-hidden="true" sx={{ height: NAVBAR_HEIGHT }} />
    </>
  );
};

export default Navbar;
