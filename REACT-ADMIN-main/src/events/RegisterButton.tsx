import { Button, useRecordContext, useUpdate, useNotify, usePermissions } from "react-admin";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BlockIcon from "@mui/icons-material/Block";
import { canRegister } from "../utils/permissions";

export const RegisterButton = () => {
  const record = useRecordContext();
  const { permissions } = usePermissions();
  const [update, { isLoading }] = useUpdate();
  const notify = useNotify();

  if (!record || !canRegister(permissions)) return null;

  const full = record.capacity != null && (record.registeredCount ?? 0) >= record.capacity;
  const closed = record.status === "cancelled" || record.status === "completed";
  const disabled = isLoading || full || closed;

  const handleClick = () => {
    update(
      "events",
      {
        id: record.id,
        data: { registeredCount: (record.registeredCount ?? 0) + 1 },
        previousData: record,
      },
      {
        onSuccess: () => notify("Inscription confirmée", { type: "success" }),
        onError: () => notify("Échec de l'inscription", { type: "error" }),
      }
    );
  };

  let label = "S'inscrire";
  if (closed) label = "Inscriptions closes";
  else if (full) label = "Complet";

  return (
    <Button
      label={label}
      onClick={handleClick}
      disabled={disabled}
      startIcon={disabled ? <BlockIcon /> : <EventAvailableIcon />}
      variant="contained"
      sx={{ mt: 2 }}
    />
  );
};
