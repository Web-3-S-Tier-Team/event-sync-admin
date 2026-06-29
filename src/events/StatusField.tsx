import { Chip } from "@mui/material";
import { useRecordContext } from "react-admin";

const STATUS_CONFIG: Record<string, { label: string; color: "info" | "success" | "default" | "error" }> = {
  upcoming: { label: "À venir", color: "info" },
  ongoing: { label: "En cours", color: "success" },
  completed: { label: "Terminé", color: "default" },
  cancelled: { label: "Annulé", color: "error" },
};

interface StatusFieldProps {
  label?: string;
}

export const StatusField = (_props: StatusFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;

  const config = STATUS_CONFIG[record.status] ?? { label: record.status, color: "default" as const };

  return <Chip label={config.label} color={config.color} size="small" />;
};

StatusField.defaultProps = {
  label: "Statut",
};
