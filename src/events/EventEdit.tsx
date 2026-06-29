import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  DateTimeInput,
  ImageInput,
  ImageField,
  required,
  minValue,
  useRecordContext,
} from "react-admin";
import { validateTitle, validateCapacity } from "../utils/validators";
import { CATEGORIES, STATUSES } from "./EventList";

const EventTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <span>Modifier : {record.title}</span>;
};

export const EventEdit = () => (
  <Edit title={<EventTitle />}>
    <SimpleForm>
      <ImageInput source="image" label="Affiche de l'événement" accept={{ "image/*": [] }}>
        <ImageField source="src" title="title" />
      </ImageInput>

      <TextInput source="title" label="Titre" validate={validateTitle} />
      <TextInput source="description" label="Description" multiline minRows={3} />
      <TextInput source="location" label="Lieu" validate={required()} />
      <TextInput source="organizer" label="Organisateur" validate={required()} />

      <SelectInput source="category" label="Catégorie" validate={required()} choices={CATEGORIES} />

      <DateTimeInput source="date" label="Date et heure" validate={required()} />

      <NumberInput source="capacity" label="Capacité" validate={validateCapacity} />
      <NumberInput source="registeredCount" label="Inscrits" validate={[minValue(0)]} />

      <SelectInput source="status" label="Statut" validate={required()} choices={STATUSES} />
    </SimpleForm>
  </Edit>
);
