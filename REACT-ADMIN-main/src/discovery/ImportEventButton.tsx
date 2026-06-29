import { useState } from "react";
import { Button, useCreate, useNotify } from "react-admin";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import type { TicketmasterEvent } from "../providers/ticketmasterDataProvider";

interface ImportEventButtonProps {
  record?: TicketmasterEvent;
}

export const ImportEventButton = ({ record }: ImportEventButtonProps) => {
  const [create, { isLoading }] = useCreate();
  const notify = useNotify();
  const [imported, setImported] = useState(false);

  if (!record) return null;

  const handleImport = (e: React.MouseEvent) => {
    e.stopPropagation();
    create(
      "events",
      {
        data: {
          title: record.title,
          description: record.description,
          location: record.location,
          organizer: record.organizer,
          category: record.category,
          date: record.date,
          capacity: 100,
          registeredCount: 0,
          status: record.status,
          image: { src: record.image, title: record.title },
        },
      },
      {
        onSuccess: () => {
          setImported(true);
          notify("Événement importé — pensez à ajuster la capacité", { type: "success" });
        },
        onError: () => notify("Échec de l'import", { type: "error" }),
      }
    );
  };

  return (
    <Button
      label={imported ? "Importé" : "Importer"}
      onClick={handleImport}
      disabled={isLoading || imported}
      startIcon={imported ? <DownloadDoneIcon /> : <FileDownloadIcon />}
      color={imported ? "success" : "primary"}
    />
  );
};
