import { defaultDarkTheme } from "react-admin";
import { deepmerge } from "@mui/utils";

export const darkTheme = deepmerge(defaultDarkTheme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#8B85D6",
      contrastText: "#000000",
    },
    secondary: {
      main: "#F5A623",
    },
    success: { main: "#3DC9B5" },
    error: { main: "#FF7A63" },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#C7C7C7",
    },
    divider: "rgba(255,255,255,0.14)",
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
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#000000" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          backgroundImage: "none",
        },
        rounded: { borderRadius: 12 },
        outlined: { border: "1px solid rgba(255,255,255,0.12)" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          backgroundImage: "none",
          color: "#FFFFFF",
          borderBottom: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#000000",
          borderRight: "1px solid rgba(255,255,255,0.12)",
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
          color: "#FFFFFF",
          "& .RaMenuItemLink-icon": { color: "#B0B0B0" },
          "&:hover": { backgroundColor: "rgba(139,133,214,0.12)" },
          "&.RaMenuItemLink-active": {
            backgroundColor: "rgba(139,133,214,0.18)",
            color: "#FFFFFF",
            fontWeight: 600,
            "& .RaMenuItemLink-icon": { color: "#8B85D6" },
          },
        },
      },
    },
  },
});
