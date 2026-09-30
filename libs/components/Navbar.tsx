import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, IconButton, Stack } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LangThemeControls from "@/libs/components/LangThemeControls";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { COLORS, EASE, FONT_FAMILY, NAV_HEIGHT, REDUCED_MOTION } from "@/libs/ui";

const menuIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const NAV = [
  { id: "work", key: "work" },
  { id: "about", key: "about" },
  { id: "experience", key: "experience" },
  { id: "stack", key: "stack" },
  { id: "blog", key: "blog" },
] as const;

const useScrolled = (threshold = 8): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};

const useActiveSection = (): string => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
};

const hrefFor = (id: string): string => (id === "blog" ? "/blog" : `/#${id}`);

const Navbar = () => {
  const router = useRouter();
  const scrolled = useScrolled();
  const section = useActiveSection();
  const active = router.pathname.startsWith("/blog") ? "blog" : section;
  const [open, setOpen] = useState(false);
  const { m } = useI18n();
  const { profile, socials } = useContent();

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(m.mailSubject)}&body=${encodeURIComponent(m.mailBody)}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = (): void => setOpen(false);

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          height: NAV_HEIGHT,
          display: "flex",
          alignItems: "center",
          px: { xs: "16px", sm: "24px", md: "32px" },
          backgroundColor: open ? COLORS.bg : scrolled ? COLORS.navScrolled : COLORS.nav,
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          borderBottom: `1px solid ${scrolled || open ? COLORS.line : "transparent"}`,
          transition: "background-color 240ms ease, border-color 240ms ease",
        }}
      >
        <Stack
          component="nav"
          aria-label="Main navigation"
          sx={{
            width: "100%",
            maxWidth: 1120,
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box
            component="a"
            href="/#top"
            onClick={close}
            sx={{
              fontFamily: FONT_FAMILY,
              fontWeight: 700,
              fontSize: { xs: "15px", md: "16px" },
              letterSpacing: "-0.03em",
              color: COLORS.ink,
              borderRadius: "8px",
              flexShrink: 0,
              "&:focus-visible": {
                outline: `2px solid ${COLORS.ink}`,
                outlineOffset: "4px",
              },
            }}
          >
            Yusufjon
          </Box>

          <Stack
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <Box
                  key={item.id}
                  component="a"
                  href={hrefFor(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  sx={{
                    px: "12px",
                    py: "8px",
                    borderRadius: "999px",
                    fontFamily: FONT_FAMILY,
                    fontSize: "14px",
                    fontWeight: isActive ? 650 : 500,
                    letterSpacing: "-0.01em",
                    color: isActive ? COLORS.ink : COLORS.body,
                    backgroundColor: isActive ? COLORS.pill : "transparent",
                    transition: "color 200ms ease, background-color 200ms ease",
                    "&:hover": { color: COLORS.ink, backgroundColor: COLORS.pill },
                    "&:focus-visible": {
                      outline: `2px solid ${COLORS.ink}`,
                      outlineOffset: "2px",
                    },
                  }}
                >
                  {m.nav[item.key]}
                </Box>
              );
            })}
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <LangThemeControls />
            </Box>
            <Box
              component="a"
              href={mailto}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                px: "16px",
                borderRadius: "10px",
                backgroundColor: COLORS.inverse,
                color: COLORS.inverseText,
                fontFamily: FONT_FAMILY,
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                "&:hover": { backgroundColor: COLORS.inverseHover },
                "&:focus-visible": {
                  outline: `2px solid ${COLORS.ink}`,
                  outlineOffset: "3px",
                },
              }}
            >
              {m.contact}
            </Box>

            <IconButton
              aria-label={open ? m.menuClose : m.menuOpen}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              sx={{
                display: { lg: "none" },
                width: 40,
                height: 40,
                color: COLORS.ink,
                border: `1px solid ${COLORS.line}`,
                borderRadius: "10px",
                backgroundColor: COLORS.surface,
              }}
            >
              {open ? <CloseRoundedIcon sx={{ fontSize: 20 }} /> : <MenuRoundedIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {open && (
        <Box
          sx={{
            display: { lg: "none" },
            position: "fixed",
            zIndex: 1190,
            top: NAV_HEIGHT,
            left: 0,
            right: 0,
            bottom: 0,
            px: "24px",
            pt: "20px",
            pb: "calc(28px + env(safe-area-inset-bottom, 0px))",
            backgroundColor: COLORS.bg,
            animation: `${menuIn} 280ms ${EASE}`,
            [REDUCED_MOTION]: { animation: "none" },
          }}
        >
          <Stack
            component="nav"
            aria-label="Mobile navigation"
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ display: { sm: "none" }, mb: "12px" }}>
              <LangThemeControls />
            </Box>
            {NAV.map((item) => (
              <Box
                key={item.id}
                component="a"
                href={hrefFor(item.id)}
                onClick={close}
                sx={{
                  py: "14px",
                  borderBottom: `1px solid ${COLORS.line}`,
                  fontFamily: FONT_FAMILY,
                  fontSize: "28px",
                  fontWeight: 650,
                  letterSpacing: "-0.04em",
                  color: COLORS.ink,
                }}
              >
                {m.nav[item.key]}
              </Box>
            ))}
            <Box
              component="a"
              href={mailto}
              sx={{
                mt: "18px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 46,
                borderRadius: "12px",
                backgroundColor: COLORS.inverse,
                color: COLORS.inverseText,
                fontFamily: FONT_FAMILY,
                fontWeight: 650,
              }}
            >
              {m.contact}
            </Box>
            <Stack
              sx={{
                mt: "auto",
                pt: "24px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "16px 22px",
              }}
            >
              {socials.map((item) => (
                <Box
                  key={item.label}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontFamily: FONT_FAMILY,
                    fontSize: "14px",
                    fontWeight: 550,
                    color: COLORS.body,
                    "&:hover": { color: COLORS.ink },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}

      <Box aria-hidden="true" sx={{ height: NAV_HEIGHT }} />
    </>
  );
};

export default Navbar;
