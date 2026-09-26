export const EMAIL = "yusufjon6727@gmail.com";

export const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/",
  },
  {
    label: "GitHub",
    href: "https://github.com/sharifjonovyusufjon",
  },
  {
    label: "Telegram",
    href: "https://t.me/YusufjonSharifjonov",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sharifjonovyusufjon/",
  },
] as const;

export const NAV_ITEMS = [
  { id: "work", label: "작업" },
  { id: "about", label: "소개" },
  { id: "experience", label: "경력" },
  { id: "stack", label: "기술" },
] as const;

export const contactMailto = (): string => {
  const subject = encodeURIComponent("프로젝트 관련 문의드립니다.");
  const body = encodeURIComponent("안녕하세요~ ");
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};
