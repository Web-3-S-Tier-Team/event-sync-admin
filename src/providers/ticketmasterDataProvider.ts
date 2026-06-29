import type { DataProvider } from "react-admin";
import { buildCategoryPlaceholder } from "../utils/eventImage";

/**
 * Read-only data provider backed by the Ticketmaster Discovery API.
 *
 * The Discovery API is free, public, and explicitly allows CORS
 * (Access-Control-Allow-Origin: *), so it can be called directly from
 * the browser without a backend proxy.
 *
 * Get a free key at https://developer.ticketmaster.com/ and set it as
 * VITE_TICKETMASTER_API_KEY in your .env file.
 */

const TM_BASE = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY as string | undefined;

export interface TicketmasterEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  organizer: string;
  category: string;
  date: string | null;
  image: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  url: string;
}

// Ticketmaster classification segments -> our local event categories
const SEGMENT_TO_CATEGORY: Record<string, string> = {
  Music: "Concert",
  Sports: "Sport",
  "Arts & Theatre": "Culturel",
  Film: "Culturel",
  Miscellaneous: "Autre",
  Undefined: "Autre",
};

const mapStatus = (
  code: string | undefined,
  dateIso: string | null
): TicketmasterEvent["status"] => {
  if (code === "cancelled") return "cancelled";
  if (code === "postponed" || code === "rescheduled") return "upcoming";
  if (dateIso && new Date(dateIso).getTime() < Date.now()) return "completed";
  return "upcoming";
};

const mapEvent = (raw: any): TicketmasterEvent => {
  const venue = raw._embedded?.venues?.[0];
  const segment = raw.classifications?.[0]?.segment?.name ?? "Undefined";
  const dateIso =
    raw.dates?.start?.dateTime ??
    (raw.dates?.start?.localDate
      ? `${raw.dates.start.localDate}T${raw.dates.start.localTime ?? "00:00:00"}`
      : null);
  const bestImage =
    raw.images?.find((img: any) => img.ratio === "16_9" && img.width >= 640) ??
    raw.images?.[0];
  const category = SEGMENT_TO_CATEGORY[segment] ?? "Autre";

  return {
    id: raw.id,
    title: raw.name,
    description: raw.info ?? raw.pleaseNote ?? "",
    location: venue ? [venue.name, venue.city?.name].filter(Boolean).join(", ") : "Lieu inconnu",
    organizer: raw.promoter?.name ?? raw._embedded?.attractions?.[0]?.name ?? "Ticketmaster",
    category,
    date: dateIso,
    image: bestImage?.url ?? buildCategoryPlaceholder(category),
    status: mapStatus(raw.dates?.status?.code, dateIso),
    url: raw.url,
  };
};

const missingKeyError = () =>
  new Error(
    "Clé API Ticketmaster manquante. Ajoutez VITE_TICKETMASTER_API_KEY dans votre fichier .env (clé gratuite sur developer.ticketmaster.com)."
  );

const readOnlyError = () => new Error("Cette source est en lecture seule — importez l'événement pour le modifier.");

export const ticketmasterDataProvider: DataProvider = {
  getList: async (_resource, params) => {
    if (!API_KEY) throw missingKeyError();

    const { page = 1, perPage = 10 } = params.pagination ?? {};
    const { order = "ASC" } = params.sort ?? {};

    const query = new URLSearchParams({
      apikey: API_KEY,
      size: String(Math.min(perPage, 50)),
      page: String(page - 1),
      sort: `date,${order.toLowerCase()}`,
      countryCode: (params.filter?.countryCode as string) || "FR",
    });

    if (params.filter?.q) query.set("keyword", params.filter.q as string);

    const res = await fetch(`${TM_BASE}/events.json?${query.toString()}`);
    if (!res.ok) {
      if (res.status === 401) throw missingKeyError();
      throw new Error(`Erreur Ticketmaster (${res.status})`);
    }
    const json = await res.json();
    const rawEvents = json._embedded?.events ?? [];

    return {
      data: rawEvents.map(mapEvent),
      total: json.page?.totalElements ?? rawEvents.length,
    };
  },

  getOne: async (_resource, params) => {
    if (!API_KEY) throw missingKeyError();
    const res = await fetch(`${TM_BASE}/events/${params.id}.json?apikey=${API_KEY}`);
    if (!res.ok) throw new Error(`Erreur Ticketmaster (${res.status})`);
    const raw = await res.json();
    return { data: mapEvent(raw) };
  },

  getMany: async (_resource, params) => {
    if (!API_KEY) throw missingKeyError();
    const results = await Promise.all(
      params.ids.map((id) =>
        fetch(`${TM_BASE}/events/${id}.json?apikey=${API_KEY}`).then((r) => r.json())
      )
    );
    return { data: results.map(mapEvent) };
  },

  getManyReference: async () => {
    throw readOnlyError();
  },
  create: async () => {
    throw readOnlyError();
  },
  update: async () => {
    throw readOnlyError();
  },
  updateMany: async () => {
    throw readOnlyError();
  },
  delete: async () => {
    throw readOnlyError();
  },
  deleteMany: async () => {
    throw readOnlyError();
  },
};
