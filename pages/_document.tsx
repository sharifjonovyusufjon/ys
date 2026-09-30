import { Html, Head, Main, NextScript } from "next/document";

const themeBoot = `(function(){try{var t=localStorage.getItem("ys-theme");if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");var m=document.querySelector("meta[name=theme-color]");if(m)m.setAttribute("content","#12110f");}var l=localStorage.getItem("ys-lang");if(l==="en"||l==="uz"||l==="ko"){document.documentElement.lang=l;}}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f4f1eb" />
        <link rel="icon" type="image/png" sizes="96x96" href="/image.png" />
        <link rel="apple-touch-icon" href="/image.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
