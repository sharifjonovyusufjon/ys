import type { L10n, SiteContent, TechItem } from "@/libs/types";

const L = (ko: string, en: string, uz: string): L10n => ({ ko, en, uz });
const brand = (ko: string, en: string, icon: string, color: string): TechItem => ({
  name: L(ko, en, en),
  icon,
  color,
});

export const fallbackContent: SiteContent = {
  profile: {
    name: "Sharifjonov Yusufjon",
    email: "yusufjon6727@gmail.com",
    phone: "+82 10-8256-6727",
    phoneTel: "+821082566727",
    portrait: "",
    location: L("서울, 대한민국", "Seoul, Korea", "Seul, Koreya"),
    visa: L("D-10 구직 비자", "D-10 job-seeker visa", "D-10 ish qidirish vizasi"),
    eyebrow: L(
      "풀스택 소프트웨어 엔지니어",
      "Full-stack software engineer",
      "Full-stack dasturchi",
    ),
    headline: L(
      "안녕하세요,\n저는 풀스택\n소프트웨어\n엔지니어입니다.",
      "Hello,\nI'm a full-stack\nsoftware\nengineer.",
      "Salom,\nmen full-stack\ndasturiy ta'minot\nmuhandisiman.",
    ),
    description: L(
      "실제 문제를 해결하는 모바일 및 웹 앱을 만드는 소프트웨어 엔지니어입니다. 프론트엔드와 백엔드를 함께 설계하고, 유지하기 쉬운 제품으로 만듭니다.",
      "I build mobile and web apps that solve real problems. I design the frontend and backend together, and ship products that stay maintainable.",
      "Haqiqiy muammolarni hal qiladigan mobil va veb ilovalar yozaman. Frontend va backendni birga loyihalab, qo'llab-quvvatlash oson mahsulot qilaman.",
    ),
    meta: L(
      "서울 · D-10 구직 비자 · 한국어 5단계",
      "Seoul · D-10 visa · Korean level 5",
      "Seul · D-10 viza · Koreys tili 5-bosqich",
    ),
    availability: L(
      "새로운 프로젝트에 참여 가능합니다",
      "Available for new projects",
      "Yangi loyihalar uchun ochiqman",
    ),
    footerLead: L(
      "새로운 프로젝트,\n편하게 연락 주세요.",
      "Have a project?\nJust write.",
      "Yangi loyiha bo'lsa,\nyozing.",
    ),
    bio: L(
      "TypeScript, React, Next.js, Node.js, NestJS 및 Express를 사용하여 현대적인 웹 애플리케이션을 구축한 경험을 보유한 풀스택 개발자입니다. MySQL 및 MongoDB를 포함한 SQL 및 NoSQL 데이터베이스에 능숙합니다. 프론트엔드와 백엔드 전반에 걸쳐 깔끔하고 재사용 가능한 컴포넌트와 확장 가능한 아키텍처 설계에 능숙하며, 성능, 유지보수성, 안전한 API 개발 및 직관적인 사용자 경험에 중점을 두고 있습니다.",
      "Full-stack developer experienced in building modern web applications with TypeScript, React, Next.js, Node.js, NestJS, and Express. Comfortable with SQL and NoSQL databases, including MySQL and MongoDB. I design clean, reusable components and scalable architecture across frontend and backend, with a focus on performance, maintainability, safe APIs, and clear user experience.",
      "TypeScript, React, Next.js, Node.js, NestJS va Express bilan zamonaviy veb ilovalar qurgan full-stack dasturchiman. MySQL va MongoDB, SQL hamda NoSQL bilan ishlayman. Frontend va backendda qayta ishlatiladigan komponentlar va kengayadigan arxitektura loyihalayman. Asosiy e'tibor: tezlik, qo'llab-quvvatlash, xavfsiz API va tushunarli foydalanuvchi tajribasi.",
    ),
    highlights: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Express", "MySQL", "MongoDB"],
    koreanTitle: L("한국어 능력", "Korean", "Koreys tili"),
    koreanProgram: L(
      "사회통합프로그램 (KIIP)",
      "Korea Immigration & Integration Program (KIIP)",
      "Ijtimoiy integratsiya dasturi (KIIP)",
    ),
    koreanNote: L(
      "5단계 이수 · 최고 단계",
      "Completed level 5 · highest level",
      "5-bosqich yakunlangan · eng yuqori bosqich",
    ),
    koreanLevel: 5,
    koreanTotal: 5,
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/", order: 0 },
    { label: "GitHub", href: "https://github.com/sharifjonovyusufjon", order: 1 },
    { label: "Telegram", href: "https://t.me/YusufjonSharifjonov", order: 2 },
    { label: "Instagram", href: "https://www.instagram.com/sharifjonovyusufjon/", order: 3 },
  ],
  projects: [
    {
      title: L("Yusufjon", "Yusufjon", "Yusufjon"),
      link: "https://yusufjon.uz",
      image: "/logo.png",
      order: 0,
    },
  ],
  experiences: [
    {
      start: "2025.07",
      end: "",
      role: L("풀스택 개발자", "Full-stack developer", "Full-stack dasturchi"),
      company: L("프리랜서", "Freelance", "Frilanser"),
      color: "#0e7a38",
      bg: "#e5f5eb",
      order: 0,
    },
    {
      start: "2025.05",
      end: "2025.07",
      role: L("풀스택 개발자", "Full-stack developer", "Full-stack dasturchi"),
      company: L("HumbleBee AI", "HumbleBee AI", "HumbleBee AI"),
      color: "#9a5b00",
      bg: "#fff3d6",
      order: 1,
    },
    {
      start: "2024.01",
      end: "2025.05",
      role: L("미들 개발자", "Middle developer", "Middle dasturchi"),
      company: L("MIT ACADEMY", "MIT ACADEMY", "MIT ACADEMY"),
      color: "#1d4ed8",
      bg: "#eef3ff",
      order: 2,
    },
  ],
  techGroups: [
    {
      title: L("프론트엔드", "Frontend", "Frontend"),
      order: 0,
      items: [
        brand("자바스크립트", "JavaScript", "javascript", "#E3B500"),
        brand("타입스크립트", "TypeScript", "typescript", "#3178C6"),
        brand("리액트", "React", "react", "#149ECA"),
        brand("넥스트JS", "Next.js", "next", "#111111"),
        brand("리덕스 툴킷", "Redux Toolkit", "redux", "#764ABC"),
        brand("탄스택 쿼리", "TanStack Query", "query", "#FF4154"),
        brand("머티리얼 UI", "Material UI", "mui", "#007FFF"),
        brand("웹소켓", "WebSocket", "socket", "#111111"),
        brand("액시오스", "Axios", "axios", "#5A29E4"),
        brand("스위트얼럿", "SweetAlert", "sweet", "#E8604C"),
        brand("애니메JS", "Anime.js", "anime", "#F6484F"),
        brand("TUI 에디터", "TUI Editor", "tui", "#515CE6"),
        brand("그래프QL", "GraphQL", "graphql", "#E10098"),
        brand("아폴로 클라이언트", "Apollo Client", "apollo", "#311C87"),
        brand("스와이퍼", "Swiper", "swiper", "#0080FF"),
      ],
    },
    {
      title: L("백엔드", "Backend", "Backend"),
      order: 1,
      items: [
        brand("노드JS", "Node.js", "node", "#5FA04E"),
        brand("익스프레스JS", "Express", "express", "#000000"),
        brand("네스트JS", "NestJS", "nest", "#E0234E"),
        brand("몽고DB", "MongoDB", "mongodb", "#47A248"),
        brand("몽구스", "Mongoose", "mongoose", "#880000"),
        brand("레디스", "Redis", "redis", "#DC382D"),
        brand("멀터", "Multer", "multer", "#111111"),
        brand("폼데이터", "FormData", "form", "#111111"),
        brand("쿠키파서", "Cookie Parser", "cookie", "#B7791F"),
        brand("비크립트JS", "bcrypt", "bcrypt", "#111111"),
        brand("JWT", "JWT", "jwt", "#D63AFF"),
        brand("소켓IO", "Socket.IO", "socketio", "#010101"),
        brand("MVC", "MVC", "mvc", "#111111"),
        brand("익스프레스 세션", "Express Session", "session", "#111111"),
        brand("장고", "Django", "django", "#092E20"),
      ],
    },
    {
      title: L("도구", "Tools", "Vositalar"),
      order: 2,
      items: [
        brand("포스트맨", "Postman", "postman", "#FF6C37"),
        brand("얀", "Yarn", "yarn", "#2C8EBB"),
        brand("NVM", "NVM", "nvm", "#111111"),
        brand("NPM", "NPM", "npm", "#CB3837"),
        brand("깃", "Git", "git", "#F05032"),
        brand("파일질라", "FileZilla", "filezilla", "#BF0000"),
        brand("깃허브", "GitHub", "github", "#181717"),
        brand("피그마", "Figma", "figma", "#F24E1E"),
      ],
    },
    {
      title: L("인프라", "Infrastructure", "Infratuzilma"),
      order: 3,
      items: [
        brand("DNS", "DNS", "dns", "#111111"),
        brand("방화벽", "Firewall", "firewall", "#111111"),
        brand("VPS", "VPS", "vps", "#111111"),
      ],
    },
  ],
  posts: [],
};

export const cloneContent = (): SiteContent => JSON.parse(JSON.stringify(fallbackContent));
