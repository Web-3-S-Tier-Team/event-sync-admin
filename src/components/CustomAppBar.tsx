import { AppBar, TitlePortal, ToggleThemeButton } from "react-admin";
import { Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { lightTheme } from "../themes/lightTheme";
import { darkTheme } from "../themes/darkTheme";

export const CustomAppBar = () => (
  <AppBar>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
      <EventIcon />
      <Typography variant="h6" fontWeight="bold" sx={{ display: { xs: "none", sm: "block" } }}>
        Events Admin
      </Typography>
    </Box>
    <TitlePortal />
    <ToggleThemeButton lightTheme={darkTheme} />
  </AppBar>
);
