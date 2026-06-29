import { Box, LinearProgress, Typography } from "@mui/material";
import { useRecordContext } from "react-admin";
import { brand } from "../themes/tokens";

interface CapacityFieldProps {
  label?: string;
}

export const CapacityField = (_props: CapacityFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;

  const capacity = record.capacity ?? 0;
  const registered = record.registeredCount ?? 0;
  const rate = capacity > 0 ? Math.min(100, Math.round((registered / capacity) * 100)) : 0;

  const barColor = rate >= 100 ? brand.coral : rate >= 75 ? brand.amber : brand.teal;

  return (
    <Box sx={{ minWidth: 130 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {registered}/{capacity}
        </Typography>
        <Typography variant="caption" sx={{ color: barColor, fontWeight: 700 }}>
          {rate}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={rate}
        sx={{
          borderRadius: 4,
          height: 7,
          bgcolor: `${barColor}1f`,
          "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: barColor },
        }}
      />
    </Box>
  );
};

CapacityField.defaultProps = {
  label: "Remplissage",
};
