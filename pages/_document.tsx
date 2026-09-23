import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content="Sharifjonov Yusufjon" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="/image/png" href="/logo.png" />

        <meta
          name="keyword"
          content={
            "yusufjon, yusufjon.uz, sharifjonov yusufjon, sharifjonov, yusufjon sharifjonov"
          }
        />
        <meta
          name="description"
          content={
            "Public portfolio and blog website |" +
            "공개 포트폴리오 및 블로그 웹사이트"
          }
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
