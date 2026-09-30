import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import BlogSection from "@/libs/components/HomePage/BlogSection";
import SectionHeading from "@/libs/components/SectionHeading";
import withLayoutHome from "@/libs/layout/withHomeLayout";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import type { SiteContent } from "@/libs/types";
import { COLORS, FONT_FAMILY, containerSx, sectionSx } from "@/libs/ui";

const BlogPage: NextPage<{ content: SiteContent }> = () => {
  const { m } = useI18n();
  const { posts } = useContent();

  return (
    <>
      <Head>
        <title>{`${m.sections.blog} · Yusufjon`}</title>
      </Head>
      {posts.length ? (
        <BlogSection />
      ) : (
        <Box component="section" sx={sectionSx}>
          <Box sx={containerSx}>
            <SectionHeading index="05" title={m.sections.blog} sx={{ mb: "20px" }} />
            <Typography sx={{ fontFamily: FONT_FAMILY, color: COLORS.muted }}>{m.blogEmpty}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ content: SiteContent }> = async () => {
  const { cloneContent } = await import("@/libs/fallback");
  try {
    const { loadContent } = await import("@/libs/db");
    return { props: { content: await loadContent(false) } };
  } catch {
    return { props: { content: cloneContent() } };
  }
};

export default withLayoutHome(BlogPage);
