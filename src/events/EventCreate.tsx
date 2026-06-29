import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  DateTimeInput,
  ImageInput,
  ImageField,
  required,
  minValue,
} from "react-admin";
import { validateTitle, validateCapacity } from "../utils/validators";
import { CATEGORIES, STATUSES } from "./EventList";

export const EventCreate = () => (
  <Create redirect="list">
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
      <NumberInput
        source="registeredCount"
        label="Inscrits"
        defaultValue={0}
        validate={[minValue(0)]}
      />

      <SelectInput
        source="status"
        label="Statut"
        validate={required()}
        choices={STATUSES}
        defaultValue="upcoming"
      />
    </SimpleForm>
  </Create>
);
