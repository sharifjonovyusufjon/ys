import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { ContentProvider } from "@/libs/content";
import { LocaleProvider } from "@/libs/locale";
import { ThemeModeProvider } from "@/libs/theme-mode";
import type { SiteContent } from "@/libs/types";
import "@/styles/globals.css";

export default function App(props: AppProps<{ content?: SiteContent }>) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <LocaleProvider>
        <ThemeModeProvider>
          <ContentProvider content={pageProps.content}>
            <Component {...pageProps} />
          </ContentProvider>
        </ThemeModeProvider>
      </LocaleProvider>
    </AppCacheProvider>
  );
}
