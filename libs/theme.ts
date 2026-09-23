import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#171717", // qora tugmalar
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff", // oq "pill" tugmalar
      contrastText: "#262626",
    },
    background: {
      default: "#e9e9e8", // butun sayt foni (body)
      paper: "#f7f7f6", // Card, Paper fonlari
    },
    text: {
      primary: "#171717",
      secondary: "#737373",
    },
    divider: "#e5e5e5",
  },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h3: { fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.4 },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.75rem", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 500 }, // MUI default KATTA harfni o'chiradi
  },

  shape: {
    borderRadius: 12,
  },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 768, lg: 1200, xl: 1536 },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999, // hamma tugmalar dumaloq
          padding: "10px 24px",
          fontSize: "0.75rem",
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
