import { Box, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import SectionHeading from "@/libs/components/SectionHeading";
import { useContent } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { COLORS, FONT_FAMILY, containerSx, sectionSx } from "@/libs/ui";

const BlogSection = () => {
  const { m, tr, locale } = useI18n();
  const { posts } = useContent();
  if (!posts.length) return null;

  const dateLocale = locale === "ko" ? "ko-KR" : locale === "uz" ? "uz-UZ" : "en-US";

  return (
    <Box component="section" id="blog" aria-labelledby="blog-title" sx={{ ...sectionSx, borderTop: `1px solid ${COLORS.line}` }}>
      <Box sx={containerSx}>
        <SectionHeading id="blog-title" index="05" title={m.sections.blog} sx={{ mb: { xs: "28px", md: "40px" } }} />
        <Stack sx={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post) => (
            <Box
              key={post.slug}
              component="a"
              href={`/blog/${post.slug}`}
              sx={{
                py: { xs: "18px", md: "22px" },
                borderTop: `1px solid ${COLORS.line}`,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "160px minmax(0, 1fr) auto" },
                gap: { xs: "6px", md: "24px" },
                alignItems: "center",
                color: COLORS.ink,
                "&:hover .post-title": { textDecoration: "underline" },
              }}
            >
              <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", color: COLORS.muted }}>
                {new Date(post.createdAt).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
              <Box>
                <Typography className="post-title" sx={{ fontFamily: FONT_FAMILY, fontSize: { xs: "18px", md: "22px" }, fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {tr(post.title)}
                </Typography>
                <Typography sx={{ mt: "4px", fontFamily: FONT_FAMILY, fontSize: "14px", color: COLORS.body }}>
                  {tr(post.excerpt)}
                </Typography>
              </Box>
              <Stack sx={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 650, color: COLORS.body }}>
                {m.read}
                <ArrowOutwardRoundedIcon sx={{ fontSize: 16 }} />
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogSection;
