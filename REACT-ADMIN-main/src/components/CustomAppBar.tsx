import { AppBar, TitlePortal, ToggleThemeButton } from "react-admin";
import { Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { darkTheme } from "../themes/darkTheme";

export const CustomAppBar = () => (
  <AppBar>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mr: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          borderRadius: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <EventIcon sx={{ fontSize: 20 }} />
      </Box>
      <Typography
        variant="h6"
        fontWeight={700}
        letterSpacing="-0.01em"
        color="inherit"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        Events Admin
      </Typography>
    </Box>
    <TitlePortal />
    <ToggleThemeButton lightTheme={darkTheme} />
  </AppBar>
);
