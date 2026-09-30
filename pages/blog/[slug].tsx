import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import SafeImage from "@/libs/components/SafeImage";
import withLayoutHome from "@/libs/layout/withHomeLayout";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import type { SiteContent } from "@/libs/types";
import { COLORS, FONT_FAMILY, containerSx } from "@/libs/ui";

const PostPage: NextPage<{ content: SiteContent }> = () => {
  const router = useRouter();
  const { m, tr, locale } = useI18n();
  const { posts } = useContent();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const post = posts.find((item) => item.slug === slug);
  const dateLocale = locale === "ko" ? "ko-KR" : locale === "uz" ? "uz-UZ" : "en-US";

  if (!post) return null;

  const title = tr(post.title);

  return (
    <>
      <Head>
        <title>{`${title} · Yusufjon`}</title>
        <meta name="description" content={tr(post.excerpt)} />
      </Head>
      <Box component="article" sx={{ ...containerSx, pt: { xs: "28px", md: "56px" }, pb: { xs: "72px", md: "112px" } }}>
        <Box component="a" href="/blog" sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", fontWeight: 650, color: COLORS.muted }}>
          ← {m.allPosts}
        </Box>
        <Typography
          component="h1"
          sx={{
            mt: "18px",
            mb: "10px",
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "36px", md: "56px" },
            fontWeight: 750,
            letterSpacing: "-0.045em",
            lineHeight: 1.12,
            color: COLORS.ink,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ mb: "28px", fontFamily: FONT_FAMILY, fontSize: "14px", color: COLORS.muted }}>
          {new Date(post.createdAt).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
        </Typography>
        {post.cover && (
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9", mb: "28px", borderRadius: "20px", overflow: "hidden", backgroundColor: COLORS.chip }}>
            <SafeImage src={post.cover} alt="" fill sizes="(max-width: 1120px) 100vw, 1120px" style={{ objectFit: "cover" }} />
          </Box>
        )}
        <Typography
          component="div"
          sx={{
            maxWidth: 760,
            fontFamily: FONT_FAMILY,
            fontSize: { xs: "16px", md: "18px" },
            lineHeight: 1.8,
            color: COLORS.body,
            whiteSpace: "pre-wrap",
            wordBreak: "keep-all",
          }}
        >
          {tr(post.body)}
        </Typography>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ content: SiteContent }> = async (ctx) => {
  const slug = typeof ctx.params?.slug === "string" ? ctx.params.slug : "";
  try {
    const { loadContent } = await import("@/libs/db");
    const content = await loadContent(false);
    if (!content.posts.some((post) => post.slug === slug)) return { notFound: true };
    return { props: { content } };
  } catch {
    return { notFound: true };
  }
};

export default withLayoutHome(PostPage);
