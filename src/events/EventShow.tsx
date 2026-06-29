import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  ImageField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";
import { CapacityField } from "./CapacityField";
import { StatusField } from "./StatusField";

const EventShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EventShow = () => (
  <Show actions={<EventShowActions />}>
    <SimpleShowLayout>
      <ImageField source="image.src" label="Affiche" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <TextField source="location" label="Lieu" />
      <TextField source="organizer" label="Organisateur" />
      <TextField source="category" label="Catégorie" />
      <DateField source="date" label="Date et heure" showTime />
      <NumberField source="capacity" label="Capacité" />
      <NumberField source="registeredCount" label="Inscrits" />
      <CapacityField label="Taux de remplissage" />
      <StatusField label="Statut" />
      <DateField source="createdAt" label="Créé le" showTime />
      <DateField source="updatedAt" label="Mis à jour le" showTime />
    </SimpleShowLayout>
  </Show>
);
