import type { NextPage } from "next";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useI18n } from "@/libs/locale";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

const withLayoutHome = <P extends Record<string, unknown> = Record<string, unknown>>(Component: NextPage<P>) => {
  const PageWithLayout: NextPage<P> = (props) => {
    const { m } = useI18n();
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.bg,
          overflowX: "hidden",
          maxWidth: "100%",
        }}
      >
        <Box
          component="a"
          href="#content"
          sx={{
            position: "absolute",
            left: 16,
            top: -48,
            zIndex: 1400,
            px: 1.5,
            py: 1,
            borderRadius: "8px",
            backgroundColor: COLORS.inverse,
            color: COLORS.inverseText,
            fontFamily: FONT_FAMILY,
            fontSize: "13px",
            fontWeight: 600,
            "&:focus": { top: 12 },
          }}
        >
          {m.skip}
        </Box>
        <Navbar />
        <Box component="main" id="content" sx={{ width: "100%", maxWidth: "100%", flex: 1, overflowX: "hidden" }}>
          <Component {...props} />
        </Box>
        <Footer />
      </Box>
    );
  };

  return PageWithLayout;
};

export default withLayoutHome;
