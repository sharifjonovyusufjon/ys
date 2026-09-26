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
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx, sectionSx } from "@/libs/ui";

interface ContactItem {
  key: string;
  label: string;
  value: string;
  Icon: SvgIconComponent;
  href?: string;
  copy?: string;
}

export const ABOUT = {
  bio: "TypeScript, React, Next.js, Node.js, NestJS 및 Express를 사용하여 현대적인 웹 애플리케이션을 구축한 경험을 보유한 풀스택 개발자입니다. MySQL 및 MongoDB를 포함한 SQL 및 NoSQL 데이터베이스에 능숙합니다. 프론트엔드와 백엔드 전반에 걸쳐 깔끔하고 재사용 가능한 컴포넌트와 확장 가능한 아키텍처 설계에 능숙하며, 성능, 유지보수성, 안전한 API 개발 및 직관적인 사용자 경험에 중점을 두고 있습니다.",
  highlights: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Express",
    "MySQL",
    "MongoDB",
  ],
  contacts: [
    {
      key: "phone",
      label: "전화번호",
      value: "+82 10-8256-6727",
      Icon: PhoneOutlinedIcon,
      href: "tel:+821082566727",
      copy: "+821082566727",
    },
    {
      key: "email",
      label: "이메일",
      value: "yusufjon6727@gmail.com",
      Icon: MailOutlineRoundedIcon,
      href: "mailto:yusufjon6727@gmail.com",
      copy: "yusufjon6727@gmail.com",
    },
    {
      key: "visa",
      label: "비자",
      value: "D-10 구직 비자",
      Icon: BadgeOutlinedIcon,
    },
    {
      key: "location",
      label: "위치",
      value: "서울, 대한민국",
      Icon: PlaceOutlinedIcon,
    },
  ] as ContactItem[],
  korean: {
    title: "한국어 능력",
    program: "사회통합프로그램 (KIIP)",
    level: 5,
    totalLevels: 5,
    note: "5단계 이수 · 최고 단계",
  },
};

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

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, words: string[]): ReactNode[] => {
  const sorted = [...words].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    words.includes(part) ? (
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
  onCopy,
}: {
  item: ContactItem;
  delay: number;
  copied: boolean;
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
          backgroundColor: "#f3efe8",
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
        "&:hover .contact-icon": {
          backgroundColor: COLORS.ink,
          color: "#fff",
        },
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
            "&:focus-visible": {
              outline: `2px solid ${COLORS.ink}`,
              outlineOffset: "3px",
              borderRadius: "8px",
            },
          }}
        >
          {content}
        </Box>
      ) : (
        <Box sx={{ minWidth: 0, flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
          {content}
        </Box>
      )}

      {item.copy && (
        <Tooltip title={copied ? "복사됨" : "복사"} arrow placement="top">
          <IconButton
            className="copy-btn"
            size="small"
            aria-label={`${item.label} 복사`}
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
            {copied ? (
              <CheckRoundedIcon sx={{ fontSize: 16 }} />
            ) : (
              <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

const KoreanLevelCard = ({ delay }: { delay: number }) => {
  const { title, program, level, totalLevels, note } = ABOUT.korean;

  return (
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
        ...enter(delay),
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "14px",
        }}
      >
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
            color: "#fff",
          }}
        >
          <TranslateRoundedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontFamily: FONT_FAMILY,
              fontSize: "12px",
              fontWeight: 650,
              color: COLORS.blue,
            }}
          >
            {title}
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
            {program}
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
            단계
          </Box>
        </Typography>
      </Stack>

      <Stack
        role="img"
        aria-label={`${totalLevels}단계 중 ${level}단계 이수`}
        sx={{ display: "flex", flexDirection: "row", gap: "6px" }}
      >
        {Array.from({ length: totalLevels }, (_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 6,
              borderRadius: "999px",
              backgroundColor: COLORS.blueTrack,
              overflow: "hidden",
            }}
          >
            {i < level && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: COLORS.blue,
                  transformOrigin: "left",
                  animation: `${segmentFill} 420ms ${EASE} ${delay + 280 + i * 90}ms backwards`,
                  [REDUCED_MOTION]: { animation: "none" },
                }}
              />
            )}
          </Box>
        ))}
      </Stack>

      <Typography
        sx={{
          fontFamily: FONT_FAMILY,
          fontSize: "14px",
          fontWeight: 550,
          color: COLORS.body,
        }}
      >
        {note}
      </Typography>
    </Stack>
  );
};

const AboutMe = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-title"
      sx={{
        ...sectionSx,
        borderTop: `1px solid ${COLORS.line}`,
      }}
    >
      <Box sx={containerSx}>
        <SectionHeading id="about-title" index="02" title="소개" sx={{ mb: { xs: "28px", md: "40px" } }} />

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
            {highlightText(ABOUT.bio, ABOUT.highlights)}
          </Typography>

          <Box>
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "10px",
              }}
            >
              {ABOUT.contacts.map((item, i) => (
                <ContactRow
                  key={item.key}
                  item={item}
                  delay={220 + i * 70}
                  copied={copiedKey === item.key}
                  onCopy={handleCopy}
                />
              ))}
            </Box>
            <KoreanLevelCard delay={520} />
          </Box>
        </Box>

        <Box component="span" aria-live="polite" sx={visuallyHidden}>
          {copiedKey ? "복사되었습니다" : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMe;
