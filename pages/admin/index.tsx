import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import AdminPanel from "@/libs/components/AdminPanel";
import type { SiteContent } from "@/libs/types";

const AdminPage: NextPage<{ content: SiteContent }> = () => (
  <>
    <Head>
      <title>Admin · Yusufjon</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <AdminPanel />
  </>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isAuthed } = await import("@/libs/auth");
  if (!isAuthed(ctx.req)) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  const { cloneContent } = await import("@/libs/fallback");
  try {
    const { loadContent } = await import("@/libs/db");
    return { props: { content: await loadContent(true) } };
  } catch {
    return { props: { content: cloneContent() } };
  }
};

export default AdminPage;
