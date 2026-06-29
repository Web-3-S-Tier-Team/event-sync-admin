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
      contrastText: "#000000",
    },
    success: { main: "#1B998B" },
    error: { main: "#E5533D" },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
    divider: "rgba(0,0,0,0.12)",
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
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: "#FFFFFF" },
        rounded: { borderRadius: 12 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          backgroundImage: "none",
          color: "#000000",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "none",
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
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          color: "#000000",
          "& .RaMenuItemLink-icon": { color: "#4A4A4A" },
          "&:hover": { backgroundColor: "rgba(51,46,124,0.06)" },
          "&.RaMenuItemLink-active": {
            backgroundColor: "rgba(51,46,124,0.1)",
            color: "#332E7C",
            fontWeight: 600,
            "& .RaMenuItemLink-icon": { color: "#332E7C" },
          },
        },
      },
    },
  },
});
