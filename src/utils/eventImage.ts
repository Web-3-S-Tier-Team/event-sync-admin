import { CATEGORY_TOKENS, CATEGORY_FALLBACK } from "../themes/tokens";

/**
 * Builds a lightweight inline SVG placeholder, colored and lettered by
 * category, so an event never renders with a broken or empty image.
 * No network request involved — works offline and never 404s.
 */
export const buildCategoryPlaceholder = (category?: string): string => {
  const token = (category && CATEGORY_TOKENS[category]) || CATEGORY_FALLBACK;
  const initial = (category || "?").charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <rect width="160" height="160" fill="${token.color}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initial}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Resolves a display-ready image URL for either shape an event's `image`
 * field can take: a local upload ({ src, title }, from react-admin's
 * ImageInput) or a plain URL string (from an imported / API event).
 * Falls back to a category placeholder if there is nothing usable.
 */
export const resolveEventImage = (record?: { image?: unknown; category?: string }): string => {
  if (!record) return buildCategoryPlaceholder();
  const raw = record.image as { src?: string } | string | null | undefined;
  const src = typeof raw === "string" ? raw : raw?.src;
  return src || buildCategoryPlaceholder(record.category);
};
