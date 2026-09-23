import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { IconType } from "react-icons";
import {
  SiApollographql,
  SiAxios,
  SiDjango,
  SiExpress,
  SiFigma,
  SiFilezilla,
  SiGit,
  SiGithub,
  SiGraphql,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostman,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiSocketdotio,
  SiSwiper,
  SiTypescript,
  SiYarn,
} from "react-icons/si";
import {
  TbAlertSquareRounded,
  TbCookie,
  TbForms,
  TbKey,
  TbLayersSubtract,
  TbLock,
  TbPencil,
  TbPlugConnected,
  TbServer2,
  TbShieldLock,
  TbUpload,
  TbVersions,
  TbWaveSine,
  TbWorldWww,
} from "react-icons/tb";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Tech {
  name: string;
  Icon: IconType;
  color: string; // hover'da ikonka shu brend rangiga kiradi
}

interface TechGroup {
  title: string;
  items: Tech[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    title: "프론트엔드",
    items: [
      { name: "자바스크립트", Icon: SiJavascript, color: "#E3B500" },
      { name: "타입스크립트", Icon: SiTypescript, color: "#3178C6" },
      { name: "리액트", Icon: SiReact, color: "#149ECA" },
      { name: "넥스트JS", Icon: SiNextdotjs, color: "#000000" },
      { name: "리덕스 툴킷", Icon: SiRedux, color: "#764ABC" },
      { name: "탄스택 쿼리", Icon: SiReactquery, color: "#FF4154" },
      { name: "머티리얼 UI", Icon: SiMui, color: "#007FFF" },
      { name: "웹소켓", Icon: TbPlugConnected, color: "#111111" },
      { name: "액시오스", Icon: SiAxios, color: "#5A29E4" },
      { name: "스위트얼럿", Icon: TbAlertSquareRounded, color: "#E8604C" },
      { name: "애니메JS", Icon: TbWaveSine, color: "#F6484F" },
      { name: "TUI 에디터", Icon: TbPencil, color: "#515CE6" },
      { name: "그래프QL", Icon: SiGraphql, color: "#E10098" },
      { name: "아폴로 클라이언트", Icon: SiApollographql, color: "#311C87" },
      { name: "스와이퍼", Icon: SiSwiper, color: "#0080FF" },
    ],
  },
  {
    title: "백엔드",
    items: [
      { name: "노드JS", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "익스프레스JS", Icon: SiExpress, color: "#000000" },
      { name: "네스트JS", Icon: SiNestjs, color: "#E0234E" },
      { name: "몽고DB", Icon: SiMongodb, color: "#47A248" },
      { name: "몽구스", Icon: SiMongoose, color: "#880000" },
      { name: "레디스", Icon: SiRedis, color: "#DC382D" },
      { name: "멀터", Icon: TbUpload, color: "#111111" },
      { name: "웹소켓", Icon: TbPlugConnected, color: "#111111" },
      { name: "폼데이터", Icon: TbForms, color: "#111111" },
      { name: "쿠키파서", Icon: TbCookie, color: "#B7791F" },
      { name: "비크립트JS", Icon: TbLock, color: "#111111" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#D63AFF" },
      { name: "소켓IO", Icon: SiSocketdotio, color: "#010101" },
      { name: "MVC", Icon: TbLayersSubtract, color: "#111111" },
      { name: "익스프레스 세션", Icon: TbKey, color: "#111111" },
      { name: "장고", Icon: SiDjango, color: "#092E20" },
    ],
  },
  {
    title: "도구",
    items: [
      { name: "포스트맨", Icon: SiPostman, color: "#FF6C37" },
      { name: "얀", Icon: SiYarn, color: "#2C8EBB" },
      { name: "NVM", Icon: TbVersions, color: "#111111" },
      { name: "NPM", Icon: SiNpm, color: "#CB3837" },
      { name: "깃", Icon: SiGit, color: "#F05032" },
      { name: "파일질라", Icon: SiFilezilla, color: "#BF0000" },
      { name: "깃허브", Icon: SiGithub, color: "#181717" },
      { name: "피그마", Icon: SiFigma, color: "#F24E1E" },
    ],
  },
  {
    title: "인프라",
    items: [
      { name: "DNS", Icon: TbWorldWww, color: "#111111" },
      { name: "방화벽", Icon: TbShieldLock, color: "#111111" },
      { name: "VPS", Icon: TbServer2, color: "#111111" },
    ],
  },
];

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
  body: "#555555",
  muted: "#8a8a8a",
  border: "#e7e7e7",
  borderHover: "#cfcfcf",
  chip: "#ffffff",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

// Lenta ikki nusxadan iborat, -50% ga surilganda boshiga uzilishsiz qaytadi
const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const TechChip = ({ name, Icon, color }: Tech) => (
  <Stack
    component="li"
    sx={{
      flexShrink: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      height: { xs: 38, sm: 40 },
      px: { xs: "12px", sm: "14px" },
      borderRadius: "10px",
      border: `1px solid ${COLORS.border}`,
      backgroundColor: COLORS.chip,
      fontFamily: FONT_FAMILY,
      fontSize: { xs: "13px", sm: "14px" },
      fontWeight: 500,
      letterSpacing: "-0.01em",
      color: COLORS.ink,
      whiteSpace: "nowrap",
      cursor: "default",
      transition: `transform 300ms ${EASE}, border-color 200ms ease, box-shadow 300ms ease`,
      "& .tech-icon": {
        color: COLORS.muted,
        transition: "color 250ms ease, transform 300ms ease",
      },
      "&:hover": {
        transform: "translateY(-3px)",
        borderColor: COLORS.borderHover,
        boxShadow: "0 10px 20px -14px rgba(0, 0, 0, 0.35)",
      },
      "&:hover .tech-icon": {
        color,
        transform: "scale(1.12)",
      },
    }}
  >
    <Box
      component="span"
      className="tech-icon"
      aria-hidden="true"
      sx={{ display: "flex", fontSize: { xs: 16, sm: 18 } }}
    >
      <Icon />
    </Box>
    {name}
  </Stack>
);

const listSx = {
  m: 0,
  p: 0,
  pr: "10px", // ikki nusxa orasidagi masofa chiplar orasidagi masofaga teng bo'lsin
  listStyle: "none",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
} as const;

const MarqueeRow = ({ group, index }: { group: TechGroup; index: number }) => {
  const reverse = index % 2 === 1;
  // Elementlar soniga qarab tezlik: har biri uchun ~3.2s, lekin 18s dan kam emas
  const duration = Math.max(18, group.items.length * 3.2);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        animation: `${fadeUp} 700ms ${EASE} ${200 + index * 120}ms backwards`,
        [REDUCED_MOTION]: { animation: "none" },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          gap: "8px",
        }}
      >
        <Typography
          component="h3"
          sx={{
            m: 0,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "14px", sm: "15px" },
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: COLORS.ink,
          }}
        >
          {group.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: FONT_FAMILY,
            fontSize: "12px",
            color: COLORS.muted,
          }}
        >
          {group.items.length}
        </Typography>
      </Stack>

      {/* Chetlari xiralashgan oyna — ichida lenta aylanadi */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: "6px",
          maskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          // Sichqoncha ustida bo'lsa to'xtaydi, chiplarni bemalol ko'rish mumkin
          "&:hover .track": { animationPlayState: "paused" },
          [REDUCED_MOTION]: { maskImage: "none", WebkitMaskImage: "none" },
        }}
      >
        <Stack
          className="track"
          sx={{
            width: "max-content",
            display: "flex",
            flexDirection: "row",
            animation: `${marquee} ${duration}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            [REDUCED_MOTION]: {
              animation: "none",
              width: "auto",
              flexWrap: "wrap",
            },
          }}
        >
          {/* 1-nusxa: ekran o'quvchilar uchun asosiy ro'yxat */}
          <Stack component="ul" aria-label={group.title} sx={listSx}>
            {group.items.map((tech) => (
              <TechChip key={tech.name} {...tech} />
            ))}
          </Stack>
          {/* 2-nusxa: uzluksiz aylanish uchun, ekran o'quvchilardan yashirilgan */}
          <Stack
            component="ul"
            aria-hidden="true"
            sx={{ ...listSx, [REDUCED_MOTION]: { display: "none" } }}
          >
            {group.items.map((tech) => (
              <TechChip key={`copy-${tech.name}`} {...tech} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

/* ------------------------------------------------------------------ */
/*  Technologies                                                       */
/* ------------------------------------------------------------------ */

const Technologies = () => (
  <Box
    component="section"
    aria-labelledby="tech-title"
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
        gap: { xs: "24px", sm: "28px" },
      }}
    >
      <Typography
        id="tech-title"
        component="h2"
        sx={{
          m: 0,
          fontFamily: FONT_FAMILY,
          fontSize: { xs: "22px", sm: "26px" },
          fontWeight: 700,
          letterSpacing: "-0.035em",
          color: COLORS.ink,
          animation: `${fadeUp} 700ms ${EASE} 100ms backwards`,
          [REDUCED_MOTION]: { animation: "none" },
        }}
      >
        기술 스택
      </Typography>

      {TECH_GROUPS.map((group, i) => (
        <MarqueeRow key={group.title} group={group} index={i} />
      ))}
    </Stack>
  </Box>
);

export default Technologies;
