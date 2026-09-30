import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SectionHeading from "@/libs/components/SectionHeading";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx, sectionSx } from "@/libs/ui";

interface ContactItem {
  key: string;
  label: string;
  value: string;
  Icon: SvgIconComponent;
  href?: string;
  copy?: string;
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const segmentFill = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const enter = (delayMs: number) => ({
  animation: `${fadeUp} 650ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, words: string[]): ReactNode[] => {
  const usable = words.filter(Boolean);
  if (!usable.length) return [text];
  const sorted = [...usable].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    usable.includes(part) ? (
      <Box component="strong" key={i} sx={{ color: COLORS.ink, fontWeight: 650 }}>
        {part}
      </Box>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
};

const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  p: 0,
  m: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

const ContactRow = ({
  item,
  delay,
  copied,
  copyLabel,
  copiedLabel,
  onCopy,
}: {
  item: ContactItem;
  delay: number;
  copied: boolean;
  copyLabel: string;
  copiedLabel: string;
  onCopy: (item: ContactItem) => void;
}) => {
  const { Icon } = item;
  const content = (
    <>
      <Box
        className="contact-icon"
        aria-hidden="true"
        sx={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.iconBg,
          color: COLORS.ink,
          transition: "background-color 220ms ease, color 220ms ease",
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Box component="span" sx={visuallyHidden}>
          {item.label}:{" "}
        </Box>
        <Typography
          sx={{
            fontFamily: FONT_FAMILY,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: COLORS.muted,
          }}
        >
          {item.label}
        </Typography>
        <Typography
          className="value-text"
          sx={{
            mt: "1px",
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "14px", md: "15px" },
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: COLORS.ink,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.value}
        </Typography>
      </Box>
    </>
  );

  return (
    <Stack
      component="li"
      sx={{
        minWidth: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        p: { xs: "12px", md: "14px" },
        borderRadius: "16px",
        border: `1px solid ${COLORS.line}`,
        backgroundColor: COLORS.surface,
        ...enter(delay),
        "&:hover .contact-icon": { backgroundColor: COLORS.inverse, color: COLORS.inverseText },
        "&:hover .copy-btn": { opacity: 1 },
        "@media (hover: none)": { "& .copy-btn": { opacity: 1 } },
      }}
    >
      {item.href ? (
        <Box
          component="a"
          href={item.href}
          sx={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "inherit",
            textDecoration: "none",
            "&:hover .value-text": { textDecoration: "underline" },
            "&:focus-visible": { outline: `2px solid ${COLORS.ink}`, outlineOffset: "3px", borderRadius: "8px" },
          }}
        >
          {content}
        </Box>
      ) : (
        <Box sx={{ minWidth: 0, flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>{content}</Box>
      )}

      {item.copy && (
        <Tooltip title={copied ? copiedLabel : copyLabel} arrow placement="top">
          <IconButton
            className="copy-btn"
            size="small"
            aria-label={`${item.label} ${copyLabel}`}
            onClick={() => onCopy(item)}
            sx={{
              flexShrink: 0,
              width: 32,
              height: 32,
              opacity: copied ? 1 : 0,
              color: copied ? COLORS.green : COLORS.muted,
              transition: "opacity 200ms ease, color 200ms ease",
            }}
          >
            {copied ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />}
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

const AboutMe = () => {
  const { m, tr } = useI18n();
  const { profile } = useContent();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contacts: ContactItem[] = [
    {
      key: "phone",
      label: m.phone,
      value: profile.phone,
      Icon: PhoneOutlinedIcon,
      href: `tel:${profile.phoneTel}`,
      copy: profile.phoneTel,
    },
    {
      key: "email",
      label: m.email,
      value: profile.email,
      Icon: MailOutlineRoundedIcon,
      href: `mailto:${profile.email}`,
      copy: profile.email,
    },
    { key: "visa", label: m.visa, value: tr(profile.visa), Icon: BadgeOutlinedIcon },
    { key: "location", label: m.location, value: tr(profile.location), Icon: PlaceOutlinedIcon },
  ];

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = async (item: ContactItem): Promise<void> => {
    if (!item.copy) return;
    try {
      await navigator.clipboard.writeText(item.copy);
      setCopiedKey(item.key);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      // Clipboard permission denied.
    }
  };

  const level = profile.koreanLevel;
  const total = profile.koreanTotal || 5;

  return (
    <Box component="section" id="about" aria-labelledby="about-title" sx={{ ...sectionSx, borderTop: `1px solid ${COLORS.line}` }}>
      <Box sx={containerSx}>
        <SectionHeading id="about-title" index="02" title={m.sections.about} sx={{ mb: { xs: "28px", md: "40px" } }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(300px, 0.85fr)" },
            gap: { xs: "28px", md: "56px" },
            alignItems: "start",
          }}
        >
          <Typography
            component="p"
            sx={{
              m: 0,
              fontFamily: FONT_FAMILY,
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.8,
              letterSpacing: "-0.02em",
              color: COLORS.body,
              wordBreak: "keep-all",
              ...enter(160),
            }}
          >
            {highlightText(tr(profile.bio), profile.highlights)}
          </Typography>

          <Box>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
              {contacts.map((item, i) => (
                <ContactRow
                  key={item.key}
                  item={item}
                  delay={220 + i * 70}
                  copied={copiedKey === item.key}
                  copyLabel={m.copy}
                  copiedLabel={m.copied}
                  onCopy={handleCopy}
                />
              ))}
            </Box>

            <Stack
              sx={{
                mt: { xs: "14px", md: "16px" },
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                p: { xs: "18px", md: "22px" },
                borderRadius: "20px",
                backgroundColor: COLORS.blueSoft,
                border: `1px solid ${COLORS.blueTrack}`,
                ...enter(520),
              }}
            >
              <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "14px" }}>
                <Box
                  aria-hidden="true"
                  sx={{
                    flexShrink: 0,
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.blue,
                    color: COLORS.inverseText,
                  }}
                >
                  <TranslateRoundedIcon sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "12px", fontWeight: 650, color: COLORS.blue }}>
                    {tr(profile.koreanTitle)}
                  </Typography>
                  <Typography
                    component="h3"
                    sx={{
                      m: 0,
                      mt: "2px",
                      fontFamily: FONT_FAMILY,
                      fontSize: { xs: "16px", md: "18px" },
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: COLORS.ink,
                      wordBreak: "keep-all",
                    }}
                  >
                    {tr(profile.koreanProgram)}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    flexShrink: 0,
                    fontFamily: FONT_FAMILY,
                    fontSize: { xs: "28px", md: "32px" },
                    fontWeight: 750,
                    color: COLORS.blue,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {level}
                  <Box component="span" sx={{ fontSize: "13px", fontWeight: 650, ml: "2px" }}>
                    {m.levelWord}
                  </Box>
                </Typography>
              </Stack>

              <Stack
                role="img"
                aria-label={`${level} / ${total}`}
                sx={{ display: "flex", flexDirection: "row", gap: "6px" }}
              >
                {Array.from({ length: total }, (_, i) => (
                  <Box key={i} sx={{ flex: 1, height: 6, borderRadius: "999px", backgroundColor: COLORS.blueTrack, overflow: "hidden" }}>
                    {i < level && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: COLORS.blue,
                          transformOrigin: "left",
                          animation: `${segmentFill} 420ms ${EASE} ${800 + i * 90}ms backwards`,
                          [REDUCED_MOTION]: { animation: "none" },
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Stack>

              <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "14px", fontWeight: 550, color: COLORS.body }}>
                {tr(profile.koreanNote)}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box component="span" aria-live="polite" sx={visuallyHidden}>
          {copiedKey ? m.copiedLive : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMe;
