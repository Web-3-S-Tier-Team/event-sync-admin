/**
 * Permission rules for the Events module.
 *
 * Three roles:
 *  - admin        : full control over every event
 *  - organisateur : can create events, and manage only the ones they own
 *                    (matched via record.ownerId === identity.id)
 *  - user         : read-only, can register to events (see RegisterButton)
 */

export interface EventOwnable {
  ownerId?: number | string | null;
}

export const canCreateEvent = (role?: string): boolean =>
  role === "admin" || role === "organisateur";

export const canManageEvent = (
  role: string | undefined,
  record: EventOwnable | undefined,
  identityId: number | string | undefined
): boolean => {
  if (role === "admin") return true;
  if (role === "organisateur") {
    return !!record && record.ownerId != null && String(record.ownerId) === String(identityId);
  }
  return false;
};

export const canRegister = (role?: string): boolean => role === "user";
