import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />

        {/* Favicon — public/image.png (96x96) */}
        <link rel="icon" type="image/png" sizes="96x96" href="/image.png" />
        <link rel="apple-touch-icon" href="/image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
