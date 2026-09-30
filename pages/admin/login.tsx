import { useState } from "react";
import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, TextField, Typography } from "@mui/material";
import LangThemeControls from "@/libs/components/LangThemeControls";
import { useI18n } from "@/libs/locale";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

const LoginPage = () => {
  const router = useRouter();
  const { m } = useI18n();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setPending(true);
    setError(false);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (response.ok) {
      router.push("/admin");
      return;
    }
    setError(true);
  };

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
          component="form"
          onSubmit={submit}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: "28px",
            borderRadius: "20px",
            border: `1px solid ${COLORS.line}`,
            backgroundColor: COLORS.surface,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Typography
            component="h1"
            sx={{ m: 0, fontFamily: FONT_FAMILY, fontSize: "28px", fontWeight: 750, letterSpacing: "-0.04em", color: COLORS.ink }}
          >
            {m.admin.loginTitle}
          </Typography>
          <TextField
            type="password"
            size="small"
            label={m.admin.password}
            value={password}
            autoFocus
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && (
            <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", color: "#b42318" }}>
              {m.admin.badPassword}
            </Typography>
          )}
          <Box
            component="button"
            type="submit"
            disabled={pending}
            sx={{
              height: 44,
              border: 0,
              borderRadius: "12px",
              backgroundColor: COLORS.inverse,
              color: COLORS.inverseText,
              fontFamily: FONT_FAMILY,
              fontSize: "15px",
              fontWeight: 650,
              cursor: "pointer",
            }}
          >
            {m.admin.login}
          </Box>
          <LangThemeControls />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
