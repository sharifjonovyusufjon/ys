import type { NextPage } from "next";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

const withLayoutHome = (Component: NextPage) => {
  const PageWithLayout: NextPage = (props) => {
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
            backgroundColor: COLORS.ink,
            color: "#fff",
            fontFamily: FONT_FAMILY,
            fontSize: "13px",
            fontWeight: 600,
            "&:focus": { top: 12 },
          }}
        >
          본문으로 건너뛰기
        </Box>
        <Navbar />
        <Box
          component="main"
          id="content"
          sx={{ width: "100%", maxWidth: "100%", flex: 1, overflowX: "hidden" }}
        >
          <Component {...props} />
        </Box>
        <Footer />
      </Box>
    );
  };

  return PageWithLayout;
};

export default withLayoutHome;
