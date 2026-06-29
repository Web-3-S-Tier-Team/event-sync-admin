import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  SearchInput,
  SelectInput,
  usePermissions,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
} from "react-admin";
import { Avatar } from "@mui/material";
import { exporter } from "../components/CsvExporter";
import { CapacityField } from "./CapacityField";
import { StatusField } from "./StatusField";
import { CategoryField } from "./CategoryField";
import { EventRowActions } from "./EventRowActions";
import { resolveEventImage } from "../utils/eventImage";
import { canCreateEvent } from "../utils/permissions";

export const CATEGORIES = [
  { id: "Conférence", name: "Conférence" },
  { id: "Concert", name: "Concert" },
  { id: "Sport", name: "Sport" },
  { id: "Formation", name: "Formation" },
  { id: "Networking", name: "Networking" },
  { id: "Culturel", name: "Culturel" },
  { id: "Autre", name: "Autre" },
];

export const STATUSES = [
  { id: "upcoming", name: "À venir" },
  { id: "ongoing", name: "En cours" },
  { id: "completed", name: "Terminé" },
  { id: "cancelled", name: "Annulé" },
];

const eventFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <SelectInput
    key="category"
    source="category"
    label="Catégorie"
    emptyText="Toutes les catégories"
    choices={CATEGORIES}
  />,
  <SelectInput
    key="status"
    source="status"
    label="Statut"
    emptyText="Tous les statuts"
    choices={STATUSES}
  />,
];

const EventListActions = () => {
  const { permissions } = usePermissions();
  return (
    <TopToolbar>
      <FilterButton />
      {canCreateEvent(permissions) && <CreateButton />}
      <ExportButton />
    </TopToolbar>
  );
};

export const EventList = () => (
  <List
    filters={eventFilters}
    perPage={10}
    exporter={exporter}
    sort={{ field: "date", order: "ASC" }}
    actions={<EventListActions />}
  >
    <Datagrid rowClick="show">
      <FunctionField
        label=""
        render={(record: any) => (
          <Avatar variant="rounded" src={resolveEventImage(record)} sx={{ width: 44, height: 44 }} />
        )}
      />
      <TextField source="title" label="Titre" />
      <CategoryField label="Catégorie" />
      <TextField source="location" label="Lieu" />
      <DateField source="date" label="Date" showTime />
      <CapacityField label="Remplissage" />
      <StatusField label="Statut" />
      <EventRowActions />
    </Datagrid>
  </List>
);
