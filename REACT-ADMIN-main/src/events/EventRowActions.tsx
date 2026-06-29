import { EditButton, DeleteButton, usePermissions, useGetIdentity, useRecordContext } from "react-admin";
import { canManageEvent } from "../utils/permissions";

export const EventRowActions = () => {
  const record = useRecordContext();
  const { permissions } = usePermissions();
  const { identity } = useGetIdentity();

  if (!record) return null;

  const editable = canManageEvent(permissions, record, identity?.id);

  if (!editable) return null;

  return (
    <>
      <EditButton />
      <DeleteButton />
    </>
  );
};
