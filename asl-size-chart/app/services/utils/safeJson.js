/**
 * Parses a JSON string stored in a content block, returning a fallback
 * instead of throwing if the content is empty or malformed. Content
 * blocks are normally always valid JSON (they're only ever written by our
 * own save handlers), but a template/chart view should degrade gracefully
 * rather than crash the whole page if a row is ever empty or corrupted.
 */
export function safeJsonParse(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
