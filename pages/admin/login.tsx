import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import LangThemeControls from "@/libs/components/LangThemeControls";
import { useI18n } from "@/libs/locale";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

const LoginPage: NextPage<{ bot: string }> = ({ bot }) => {
  const router = useRouter();
  const { m } = useI18n();
  const slot = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!bot || !slot.current) return;
    window.onTelegramAuth = async (user) => {
      setError(false);
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        router.push("/admin");
        return;
      }
      setError(true);
    };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", bot);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "12");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    slot.current.replaceChildren(script);
    return () => {
      delete window.onTelegramAuth;
    };
  }, [bot, router]);

  return (
    <>
      <Head>
        <title>{m.admin.loginTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: "20px",
          backgroundColor: COLORS.bg,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            p: "28px",
            borderRadius: "20px",
            border: `1px solid ${COLORS.line}`,
            backgroundColor: COLORS.surface,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Typography
            component="h1"
            sx={{ m: 0, fontFamily: FONT_FAMILY, fontSize: "28px", fontWeight: 750, letterSpacing: "-0.04em", color: COLORS.ink }}
          >
            {m.admin.loginTitle}
          </Typography>
          <Typography sx={{ m: 0, fontFamily: FONT_FAMILY, fontSize: "14px", lineHeight: 1.6, color: COLORS.body }}>
            {m.admin.telegramHint}
          </Typography>
          <Box ref={slot} sx={{ minHeight: 44 }} />
          {!bot && (
            <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", color: "#b42318" }}>
              {m.admin.telegramMissing}
            </Typography>
          )}
          {error && (
            <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", color: "#b42318" }}>
              {m.admin.telegramDenied}
            </Typography>
          )}
          <LangThemeControls />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ bot: string }> = async () => ({
  props: { bot: process.env.TELEGRAM_BOT_USERNAME || "" },
});

export default LoginPage;
