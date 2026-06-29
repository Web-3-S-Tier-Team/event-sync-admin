import { Chip } from "@mui/material";
import { useRecordContext } from "react-admin";
import { STATUS_TOKENS, STATUS_FALLBACK } from "../themes/tokens";

interface StatusFieldProps {
  label?: string;
}

export const StatusField = (_props: StatusFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;

  const token = STATUS_TOKENS[record.status] ?? STATUS_FALLBACK;
  const Icon = token.icon;

  return (
    <Chip
      icon={<Icon style={{ color: "inherit" }} />}
      label={token.label}
      size="small"
      sx={{
        bgcolor: `${token.color}1a`,
        color: token.color,
        fontWeight: 600,
        "& .MuiChip-icon": { color: token.color },
      }}
    />
  );
};

StatusField.defaultProps = {
  label: "Statut",
};
