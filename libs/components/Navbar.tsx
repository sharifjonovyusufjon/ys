import { useEffect, useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { COLORS, EASE, FONT_FAMILY, NAV_HEIGHT, REDUCED_MOTION } from "@/libs/ui";
import { NAV_ITEMS, SOCIAL, contactMailto } from "@/libs/site";

const menuIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

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
    const nodes = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
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

const Navbar = () => {
  const scrolled = useScrolled();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

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
          backgroundColor: open
            ? COLORS.bg
            : scrolled
              ? "rgba(244, 241, 235, 0.88)"
              : "rgba(244, 241, 235, 0.72)",
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
            gap: 2,
          }}
        >
          <Box
            component="a"
            href="#top"
            onClick={close}
            sx={{
              fontFamily: FONT_FAMILY,
              fontWeight: 700,
              fontSize: { xs: "15px", md: "16px" },
              letterSpacing: "-0.03em",
              color: COLORS.ink,
              borderRadius: "8px",
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
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <Box
                  key={item.id}
                  component="a"
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  sx={{
                    px: "14px",
                    py: "8px",
                    borderRadius: "999px",
                    fontFamily: FONT_FAMILY,
                    fontSize: "14px",
                    fontWeight: isActive ? 650 : 500,
                    letterSpacing: "-0.01em",
                    color: isActive ? COLORS.ink : COLORS.body,
                    backgroundColor: isActive ? "rgba(26, 25, 22, 0.06)" : "transparent",
                    transition: `color 200ms ease, background-color 200ms ease`,
                    "&:hover": {
                      color: COLORS.ink,
                      backgroundColor: "rgba(26, 25, 22, 0.05)",
                    },
                    "&:focus-visible": {
                      outline: `2px solid ${COLORS.ink}`,
                      outlineOffset: "2px",
                    },
                  }}
                >
                  {item.label}
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
            <Box
              component="a"
              href={contactMailto()}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 36, md: 40 },
                px: { xs: "14px", md: "16px" },
                borderRadius: "10px",
                backgroundColor: COLORS.ink,
                color: "#fff",
                fontFamily: FONT_FAMILY,
                fontSize: { xs: "13px", md: "14px" },
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                "&:hover": { backgroundColor: "#2c2a26" },
                "&:focus-visible": {
                  outline: `2px solid ${COLORS.ink}`,
                  outlineOffset: "3px",
                },
              }}
            >
              연락하기
            </Box>

            <IconButton
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              sx={{
                display: { md: "none" },
                width: 40,
                height: 40,
                color: COLORS.ink,
                border: `1px solid ${COLORS.line}`,
                borderRadius: "10px",
                backgroundColor: COLORS.surface,
              }}
            >
              {open ? (
                <CloseRoundedIcon sx={{ fontSize: 20 }} />
              ) : (
                <MenuRoundedIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {open && (
        <Box
          sx={{
            display: { md: "none" },
            position: "fixed",
            zIndex: 1190,
            top: NAV_HEIGHT.xs,
            left: 0,
            right: 0,
            bottom: 0,
            px: "24px",
            pt: "28px",
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
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.id}
                component="a"
                href={`#${item.id}`}
                onClick={close}
                sx={{
                  py: "16px",
                  borderBottom: `1px solid ${COLORS.line}`,
                  fontFamily: FONT_FAMILY,
                  fontSize: "32px",
                  fontWeight: 650,
                  letterSpacing: "-0.04em",
                  color: COLORS.ink,
                }}
              >
                {item.label}
              </Box>
            ))}

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
              {SOCIAL.map((item) => (
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
