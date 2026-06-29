import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  FunctionField,
  TopToolbar,
  ListButton,
  EditButton,
  useRecordContext,
  usePermissions,
  useGetIdentity,
} from "react-admin";
import { Avatar, Box } from "@mui/material";
import { CapacityField } from "./CapacityField";
import { StatusField } from "./StatusField";
import { CategoryField } from "./CategoryField";
import { RegisterButton } from "./RegisterButton";
import { resolveEventImage } from "../utils/eventImage";
import { canManageEvent } from "../utils/permissions";

const EventShowActions = () => {
  const record = useRecordContext();
  const { permissions } = usePermissions();
  const { identity } = useGetIdentity();

  return (
    <TopToolbar>
      <ListButton />
      {canManageEvent(permissions, record, identity?.id) && <EditButton />}
    </TopToolbar>
  );
};

const EventPoster = () => {
  const record = useRecordContext();
  return (
    <Box sx={{ mb: 2 }}>
      <Avatar
        variant="rounded"
        src={resolveEventImage(record)}
        sx={{ width: 200, height: 200, borderRadius: 3 }}
      />
    </Box>
  );
};

export const EventShow = () => (
  <Show actions={<EventShowActions />}>
    <SimpleShowLayout>
      <FunctionField label="Affiche" render={() => <EventPoster />} />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <TextField source="location" label="Lieu" />
      <TextField source="organizer" label="Organisateur" />
      <CategoryField label="Catégorie" />
      <DateField source="date" label="Date et heure" showTime />
      <NumberField source="capacity" label="Capacité" />
      <NumberField source="registeredCount" label="Inscrits" />
      <CapacityField label="Taux de remplissage" />
      <StatusField label="Statut" />
      <DateField source="createdAt" label="Créé le" showTime />
      <DateField source="updatedAt" label="Mis à jour le" showTime />
      <RegisterButton />
    </SimpleShowLayout>
  </Show>
);
