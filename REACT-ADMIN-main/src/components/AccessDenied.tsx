import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export const AccessDenied = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 10,
      gap: 1,
    }}
  >
    <LockIcon sx={{ fontSize: 40, color: "text.secondary" }} />
    <Typography variant="h6" fontWeight={700}>
      Accès refusé
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Vous n'avez pas les droits nécessaires pour effectuer cette action.
    </Typography>
  </Box>
);
