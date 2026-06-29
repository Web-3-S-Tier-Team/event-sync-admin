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
  usePermissions,
  useGetIdentity,
} from "react-admin";
import { validateTitle, validateCapacity } from "../utils/validators";
import { CATEGORIES, STATUSES } from "./EventList";
import { canCreateEvent } from "../utils/permissions";
import { AccessDenied } from "../components/AccessDenied";

export const EventCreate = () => {
  const { permissions } = usePermissions();
  const { identity } = useGetIdentity();

  if (!canCreateEvent(permissions)) {
    return <AccessDenied />;
  }

  return (
    <Create redirect="list" transform={(data) => ({ ...data, ownerId: identity?.id ?? null })}>
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
};
