import { Box, LinearProgress, Typography } from "@mui/material";
import { useRecordContext } from "react-admin";

interface CapacityFieldProps {
  label?: string;
}

export const CapacityField = (_props: CapacityFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;

  const capacity = record.capacity ?? 0;
  const registered = record.registeredCount ?? 0;
  const rate = capacity > 0 ? Math.min(100, Math.round((registered / capacity) * 100)) : 0;

  const color = rate >= 100 ? "error" : rate >= 75 ? "warning" : "success";

  return (
    <Box sx={{ minWidth: 120 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary">
          {registered}/{capacity}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {rate}%
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={rate} color={color} sx={{ borderRadius: 1, height: 6 }} />
    </Box>
  );
};

CapacityField.defaultProps = {
  label: "Remplissage",
};
