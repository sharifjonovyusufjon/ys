export type Locale = "ko" | "en" | "uz";

export type L10n = Record<Locale, string>;

export type Profile = {
  name: string;
  email: string;
  phone: string;
  phoneTel: string;
  portrait: string;
  location: L10n;
  visa: L10n;
  eyebrow: L10n;
  headline: L10n;
  description: L10n;
  meta: L10n;
  availability: L10n;
  footerLead: L10n;
  bio: L10n;
  highlights: string[];
  koreanTitle: L10n;
  koreanProgram: L10n;
  koreanNote: L10n;
  koreanLevel: number;
  koreanTotal: number;
};

export type SocialLink = {
  _id?: string;
  label: string;
  href: string;
  order: number;
};

export type ProjectItem = {
  _id?: string;
  title: L10n;
  link: string;
  image: string;
  order: number;
};

export type ExperienceItem = {
  _id?: string;
  start: string;
  end: string;
  role: L10n;
  company: L10n;
  color: string;
  bg: string;
  order: number;
};

export type TechItem = {
  name: L10n;
  icon: string;
  color: string;
};

export type TechGroupItem = {
  _id?: string;
  title: L10n;
  order: number;
  items: TechItem[];
};

export type PostItem = {
  _id?: string;
  slug: string;
  title: L10n;
  excerpt: L10n;
  body: L10n;
  cover: string;
  published: boolean;
  createdAt: string;
};

export type SiteContent = {
  profile: Profile;
  socials: SocialLink[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  techGroups: TechGroupItem[];
  posts: PostItem[];
};

export const LOCALES: Locale[] = ["ko", "en", "uz"];

export const emptyL10n = (): L10n => ({ ko: "", en: "", uz: "" });
