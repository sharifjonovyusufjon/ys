import Head from "next/head";
import { NextPage } from "next";
import withLayoutHome from "@/libs/layout/withHomeLayout";
import Header from "@/libs/components/HomePage/Header";

const SITE_URL = "https://yusufjon.uz";
const SITE_NAME = "Sharifjonov Yusufjon";
const TITLE = "Sharifjonov Yusufjon | Software Engineer";
const DESCRIPTION =
  "Sharifjonov Yusufjon — software engineer. Public portfolio and blog website | 공개 포트폴리오 및 블로그 웹사이트";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["Yusufjon", "yusufjon.uz", "Yusufjon Sharifjonov"],
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/image.png`,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/sharifjonovyusufjon",
      "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/",
    ],
  },
];

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph (Telegram, Facebook, LinkedIn preview) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/image.png`} />
        <meta name="twitter:card" content="summary" />

        {/* Structured data — Google'da sayt nomi uchun */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header />
    </>
  );
};

export default withLayoutHome(HomePage);
