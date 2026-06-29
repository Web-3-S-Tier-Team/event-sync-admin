import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  SearchInput,
  SelectInput,
  usePermissions,
} from "react-admin";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { CategoryField } from "../events/CategoryField";
import { StatusField } from "../events/StatusField";
import { ImportEventButton } from "./ImportEventButton";
import { AccessDenied } from "../components/AccessDenied";
import type { TicketmasterEvent } from "../providers/ticketmasterDataProvider";

const COUNTRIES = [
  { id: "FR", name: "France" },
  { id: "US", name: "États-Unis" },
  { id: "GB", name: "Royaume-Uni" },
  { id: "DE", name: "Allemagne" },
  { id: "ES", name: "Espagne" },
  { id: "CA", name: "Canada" },
];

const discoveryFilters = [
  <SearchInput key="q" source="q" alwaysOn placeholder="Artiste, équipe, salle..." />,
  <SelectInput key="countryCode" source="countryCode" label="Pays" choices={COUNTRIES} alwaysOn />,
];

export const DiscoveryList = () => {
  const { permissions } = usePermissions();
  if (permissions !== "admin" && permissions !== "organisateur") {
    return <AccessDenied />;
  }

  return (
    <List
      resource="discovery"
      filters={discoveryFilters}
      filterDefaultValues={{ countryCode: "FR" }}
      perPage={10}
      sort={{ field: "date", order: "ASC" }}
      exporter={false}
    >
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <FunctionField
          label=""
          render={(record: TicketmasterEvent) => (
            <Avatar variant="rounded" src={record.image} sx={{ width: 48, height: 48 }} />
          )}
        />
        <TextField source="title" label="Titre" />
        <CategoryField label="Catégorie" />
        <TextField source="location" label="Lieu" />
        <DateField source="date" label="Date" showTime />
        <StatusField label="Statut" />
        <FunctionField
          label=""
          render={(record: TicketmasterEvent) => (
            <Tooltip title="Voir sur Ticketmaster">
              <IconButton
                size="small"
                component="a"
                href={record.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        />
        <ImportEventButton />
      </Datagrid>
    </List>
  );
};
