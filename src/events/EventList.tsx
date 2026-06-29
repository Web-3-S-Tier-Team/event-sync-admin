import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  DeleteButton,
  SearchInput,
  SelectInput,
  usePermissions,
} from "react-admin";
import { exporter } from "../components/CsvExporter";
import { CapacityField } from "./CapacityField";
import { StatusField } from "./StatusField";

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

export const EventList = () => {
  const { permissions } = usePermissions();
  const isAdmin = permissions === "admin";

  return (
    <List filters={eventFilters} perPage={10} exporter={exporter} sort={{ field: "date", order: "ASC" }}>
      <Datagrid rowClick="show">
        <TextField source="title" label="Titre" />
        <TextField source="category" label="Catégorie" />
        <TextField source="location" label="Lieu" />
        <DateField source="date" label="Date" showTime />
        <NumberField source="capacity" label="Capacité" />
        <CapacityField label="Remplissage" />
        <StatusField label="Statut" />
        {(permissions === "admin" || permissions === "manager") && <EditButton />}
        {isAdmin && <DeleteButton />}
      </Datagrid>
    </List>
  );
};
