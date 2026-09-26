import { createTheme } from "@mui/material/styles";
import { FONT_FAMILY } from "./ui";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a1916",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fffcf8",
      contrastText: "#1a1916",
    },
    background: {
      default: "#f4f1eb",
      paper: "#fffcf8",
    },
    text: {
      primary: "#1a1916",
      secondary: "#5e5a54",
    },
    divider: "#e4dfd6",
  },

  typography: {
    fontFamily: FONT_FAMILY,
    h1: {
      fontWeight: 700,
      lineHeight: 1.12,
      letterSpacing: "-0.045em",
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: "-0.04em",
    },
    button: { textTransform: "none", fontWeight: 600 },
  },

  shape: {
    borderRadius: 12,
  },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: FONT_FAMILY,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
          fontSize: "0.875rem",
          fontFamily: FONT_FAMILY,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
});

export default theme;
