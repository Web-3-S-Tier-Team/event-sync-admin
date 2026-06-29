import { defaultTheme } from "react-admin";
import { deepmerge } from "@mui/utils";

export const lightTheme = deepmerge(defaultTheme, {
  palette: {
    mode: "light",
    primary: {
      main: "#332E7C",
      light: "#5C56A8",
      dark: "#211D57",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F5A623",
      contrastText: "#211D57",
    },
    success: { main: "#1B998B" },
    error: { main: "#E5533D" },
    background: {
      default: "#F3F4F8",
      paper: "#ffffff",
    },
    text: {
      primary: "#211D3F",
      secondary: "#6B7288",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(33,29,63,0.08), 0 8px 24px rgba(33,29,63,0.04)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#332E7C",
          backgroundImage: "linear-gradient(90deg, #332E7C 0%, #211D57 100%)",
          boxShadow: "0 2px 12px rgba(33,29,63,0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 12 },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          "&.RaMenuItemLink-active": {
            backgroundColor: "rgba(51,46,124,0.1)",
            color: "#332E7C",
            fontWeight: 600,
          },
        },
      },
    },
  },
});
