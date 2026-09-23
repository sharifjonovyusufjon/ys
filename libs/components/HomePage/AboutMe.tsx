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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ContactItem {
  key: string;
  label: string; // ekran o'quvchilar uchun
  value: string; // ko'rinadigan matn
  Icon: SvgIconComponent;
  href?: string; // bosilganda ochiladigan link
  copy?: string; // nusxa olinadigan qiymat
}

export const ABOUT = {
  bio: "TypeScript, React, Next.js, Node.js, NestJS 및 Express를 사용하여 현대적인 웹 애플리케이션을 구축한 경험을 보유한 풀스택 개발자입니다. MySQL 및 MongoDB를 포함한 SQL 및 NoSQL 데이터베이스에 능숙합니다. 프론트엔드와 백엔드 전반에 걸쳐 깔끔하고 재사용 가능한 컴포넌트와 확장 가능한 아키텍처 설계에 능숙하며, 성능, 유지보수성, 안전한 API 개발 및 직관적인 사용자 경험에 중점을 두고 있습니다.",

  // Matndagi shu so'zlar qalin va to'q rangda ajralib turadi
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

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const FONT_FAMILY = [
  '"Pretendard Variable"',
  "Pretendard",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Apple SD Gothic Neo"',
  '"Noto Sans KR"',
  "system-ui",
  "sans-serif",
].join(", ");

const COLORS = {
  ink: "#111111",
  body: "#666666",
  muted: "#9a9a9a",
  border: "#ececec",
  surface: "#f7f7f7",
  iconBg: "#f2f2f2",
  green: "#1a8f3c",
  blue: "#1f5fd6",
  blueSoft: "#eef3ff",
  blueTrack: "#dbe5fb",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// KIIP bosqichlari chapdan o'ngga to'ladi
const segmentFill = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const enter = (delayMs: number) => ({
  animation: `${fadeUp} 650ms ${EASE} ${delayMs}ms backwards`,
  [REDUCED_MOTION]: { animation: "none" },
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const escapeRegExp = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Matn ichidagi kalit so'zlarni <strong> bilan o'raydi (matnning o'zi o'zgarmaydi)
const highlightText = (text: string, words: string[]): ReactNode[] => {
  const sorted = [...words].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    words.includes(part) ? (
      <Box
        component="strong"
        key={i}
        sx={{ color: COLORS.ink, fontWeight: 600 }}
      >
        {part}
      </Box>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
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
          width: 30,
          height: 30,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.iconBg,
          color: COLORS.ink,
          transition: "background-color 250ms ease, color 250ms ease",
        }}
      >
        <Icon sx={{ fontSize: 17 }} />
      </Box>
      <Box
        component="span"
        className="value-text"
        sx={{
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Box component="span" sx={visuallyHidden}>
          {item.label}:{" "}
        </Box>
        {item.value}
      </Box>
    </>
  );

  const rowTextSx = {
    minWidth: 0,
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: FONT_FAMILY,
    fontSize: { xs: "13px", sm: "14px" },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: COLORS.ink,
    textDecoration: "none",
  } as const;

  return (
    <Stack
      component="li"
      sx={{
        minWidth: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
        py: "6px",
        ...enter(delay),
        "&:hover .contact-icon": {
          backgroundColor: COLORS.ink,
          color: "#fff",
        },
        "&:hover .copy-btn, & .copy-btn:focus-visible": { opacity: 1 },
        "@media (hover: none)": { "& .copy-btn": { opacity: 1 } },
      }}
    >
      {item.href ? (
        <Box
          component="a"
          href={item.href}
          sx={{
            ...rowTextSx,
            "&:hover .value-text": {
              textDecoration: "underline",
            },
            "&:focus-visible": {
              outline: `2px solid ${COLORS.ink}`,
              outlineOffset: "3px",
              borderRadius: "6px",
            },
          }}
        >
          {content}
        </Box>
      ) : (
        <Box sx={rowTextSx}>{content}</Box>
      )}

      {item.copy && (
        <Tooltip title={copied ? "복사됨!" : "복사"} arrow placement="top">
          <IconButton
            className="copy-btn"
            size="small"
            aria-label={`${item.label} 복사`}
            onClick={() => onCopy(item)}
            sx={{
              flexShrink: 0,
              width: 28,
              height: 28,
              opacity: copied ? 1 : 0,
              color: copied ? COLORS.green : COLORS.muted,
              transition: "opacity 200ms ease, color 200ms ease",
              "&:hover": { color: copied ? COLORS.green : COLORS.ink },
            }}
          >
            {copied ? (
              <CheckRoundedIcon sx={{ fontSize: 16 }} />
            ) : (
              <ContentCopyRoundedIcon sx={{ fontSize: 14 }} />
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
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        p: { xs: "16px", sm: "18px" },
        borderRadius: "16px",
        backgroundColor: COLORS.blueSoft,
        boxShadow: `inset 0 0 0 1px ${COLORS.blueTrack}`,
        transition: `transform 350ms ${EASE}, box-shadow 350ms ease`,
        ...enter(delay),
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `inset 0 0 0 1px ${COLORS.blueTrack}, 0 14px 28px -20px rgba(31, 95, 214, 0.55)`,
        },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 38,
            height: 38,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.blue,
            color: "#fff",
          }}
        >
          <TranslateRoundedIcon sx={{ fontSize: 20 }} />
        </Box>

        <Stack
          sx={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT_FAMILY,
              fontSize: "12px",
              fontWeight: 600,
              color: COLORS.blue,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </Typography>
          <Typography
            component="h3"
            sx={{
              m: 0,
              fontFamily: FONT_FAMILY,
              fontSize: { xs: "15px", sm: "16px" },
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: "-0.02em",
              wordBreak: "keep-all",
            }}
          >
            {program}
          </Typography>
        </Stack>

        <Typography
          sx={{
            ml: "auto",
            flexShrink: 0,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "22px", sm: "24px" },
            fontWeight: 800,
            color: COLORS.blue,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {level}
          <Box
            component="span"
            sx={{ fontSize: "13px", fontWeight: 600, ml: "2px" }}
          >
            단계
          </Box>
        </Typography>
      </Stack>

      {/* Bosqichlar ko'rsatkichi */}
      <Stack
        role="img"
        aria-label={`${totalLevels}단계 중 ${level}단계 이수`}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
        }}
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
                  animation: `${segmentFill} 420ms ${EASE} ${delay + 350 + i * 160}ms backwards`,
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
          fontSize: "13px",
          fontWeight: 500,
          color: COLORS.body,
          letterSpacing: "-0.01em",
        }}
      >
        {note}
      </Typography>
    </Stack>
  );
};

/* ------------------------------------------------------------------ */
/*  About Me                                                           */
/* ------------------------------------------------------------------ */

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
      // Clipboard ruxsati bo'lmasa, hech narsa qilmaymiz
    }
  };

  return (
    <Box
      component="section"
      aria-labelledby="about-title"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        px: { xs: "16px", sm: "24px" },
        py: { xs: "32px", sm: "48px" },
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: { xs: "370px", sm: "440px" },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: { xs: "18px", sm: "20px" },
        }}
      >
        <Typography
          id="about-title"
          component="h2"
          sx={{
            m: 0,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "22px", sm: "26px" },
            fontWeight: 700,
            letterSpacing: "-0.035em",
            color: COLORS.ink,
            ...enter(100),
          }}
        >
          소개
        </Typography>

        <Typography
          component="p"
          sx={{
            m: 0,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "14px", sm: "15px" },
            lineHeight: 1.75,
            letterSpacing: "-0.01em",
            color: COLORS.body,
            wordBreak: "keep-all",
            ...enter(200),
          }}
        >
          {highlightText(ABOUT.bio, ABOUT.highlights)}
        </Typography>

        {/* Aloqa ma'lumotlari — namunadagi kabi 2x2 */}
        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            columnGap: "16px",
            rowGap: "2px",
            py: "12px",
            borderTop: `1px solid ${COLORS.border}`,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          {ABOUT.contacts.map((item, i) => (
            <ContactRow
              key={item.key}
              item={item}
              delay={320 + i * 80}
              copied={copiedKey === item.key}
              onCopy={handleCopy}
            />
          ))}
        </Box>

        <KoreanLevelCard delay={680} />

        {/* Nusxa olinganini ekran o'quvchilarga bildiradi */}
        <Box component="span" aria-live="polite" sx={visuallyHidden}>
          {copiedKey ? "복사되었습니다" : ""}
        </Box>
      </Stack>
    </Box>
  );
};

export default AboutMe;
