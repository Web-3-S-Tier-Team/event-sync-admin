import { defaultDarkTheme } from "react-admin";
import { deepmerge } from "@mui/utils";

export const darkTheme = deepmerge(defaultDarkTheme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#8B85D6",
    },
    secondary: {
      main: "#F5A623",
    },
    success: { main: "#3DC9B5" },
    error: { main: "#FF7A63" },
    background: {
      default: "#15132B",
      paper: "#1F1C3D",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(90deg, #211D57 0%, #15132B 100%)",
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
  },
});
