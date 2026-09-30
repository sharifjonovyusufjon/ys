import {
  DocumentHeadTags,
  documentGetInitialProps,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import { Head, Html, Main, NextScript, type DocumentContext, type DocumentProps } from "next/document";

const FONT =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

const boot = `(function(){try{var t=localStorage.getItem("ys-theme");if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#12110f");}var l=localStorage.getItem("ys-lang");if(l==="en"||l==="uz"||l==="ko")document.documentElement.lang=l;}catch(e){}try{var f=document.createElement("link");f.rel="stylesheet";f.href=${JSON.stringify(FONT)};f.media="print";f.onload=function(){this.media="all"};document.head.appendChild(f);}catch(e){}})();`;

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#f4f1eb" />
        <link rel="icon" type="image/png" sizes="96x96" href="/image.png" />
        <link rel="apple-touch-icon" href="/image.png" />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => documentGetInitialProps(ctx);
