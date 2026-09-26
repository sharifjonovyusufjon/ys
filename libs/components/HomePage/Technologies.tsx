import { Box, Stack, Typography } from "@mui/material";
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
import SectionHeading from "@/libs/components/SectionHeading";
import { COLORS, EASE, FONT_FAMILY, containerSx, sectionSx } from "@/libs/ui";

interface Tech {
  name: string;
  Icon: IconType;
  color: string;
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
      { name: "넥스트JS", Icon: SiNextdotjs, color: "#111111" },
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

const TechChip = ({ name, Icon, color }: Tech) => (
  <Stack
    component="li"
    sx={{
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      height: 38,
      px: "12px",
      borderRadius: "10px",
      border: `1px solid ${COLORS.line}`,
      backgroundColor: "#fff",
      fontFamily: FONT_FAMILY,
      fontSize: "13px",
      fontWeight: 550,
      letterSpacing: "-0.01em",
      color: COLORS.ink,
      whiteSpace: "nowrap",
      transition: `transform 250ms ${EASE}, border-color 200ms ease, box-shadow 250ms ease`,
      "&:hover": {
        transform: "translateY(-2px)",
        borderColor: "#cfc9be",
        boxShadow: "0 10px 18px -14px rgba(26, 25, 22, 0.45)",
      },
    }}
  >
    <Box
      component="span"
      aria-hidden="true"
      sx={{ display: "flex", fontSize: 16, color, lineHeight: 0 }}
    >
      <Icon />
    </Box>
    {name}
  </Stack>
);

const Technologies = () => (
  <Box
    component="section"
    id="stack"
    aria-labelledby="tech-title"
    sx={{
      ...sectionSx,
      borderTop: `1px solid ${COLORS.line}`,
    }}
  >
    <Box sx={containerSx}>
      <SectionHeading
        id="tech-title"
        index="04"
        title="기술 스택"
        sx={{ mb: { xs: "28px", md: "40px" } }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: "14px", md: "18px" },
        }}
      >
        {TECH_GROUPS.map((group) => (
          <Box
            key={group.title}
            sx={{
              p: { xs: "18px", md: "22px" },
              borderRadius: "20px",
              border: `1px solid ${COLORS.line}`,
              backgroundColor: COLORS.surface,
            }}
          >
            <Stack
              sx={{
                mb: "16px",
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="h3"
                sx={{
                  m: 0,
                  fontFamily: FONT_FAMILY,
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: COLORS.ink,
                }}
              >
                {group.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT_FAMILY,
                  fontSize: "12px",
                  fontVariantNumeric: "tabular-nums",
                  color: COLORS.muted,
                }}
              >
                {group.items.length}
              </Typography>
            </Stack>

            <Box
              component="ul"
              aria-label={group.title}
              sx={{
                m: 0,
                p: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {group.items.map((tech) => (
                <TechChip key={tech.name} {...tech} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Technologies;
