// restaurantsApi.js
// Centralised, paginated data-access for the restaurants list.

const API_BASE = "https://your-api.example.com"; // TODO: replace with your real base URL
export const PAGE_SIZE = 15;

/**
 * Fetch a single page of restaurants.
 *
 * @param {number} page  1-based page number
 * @returns {Promise<{ items: Array, hasMore: boolean }>}
 *
 * Each item is expected to be shaped like:
 *   { info: { id, name, cloudinaryImageId, ... } }
 * If your backend returns a different shape, map it into that form below
 * so RestaurantCard keeps working unchanged.
 */
export async function fetchRestaurants(page) {
  const res = await fetch(
    `${API_BASE}/restaurants?page=${page}&limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error(`Failed to load restaurants (HTTP ${res.status})`);
  }

  const data = await res.json();

  // ---- Adapt these two lines to your backend's response shape ----
  const items = data.restaurants ?? data.data ?? [];

  // Prefer an explicit signal from the server; otherwise infer from page size
  // (a short/empty final page means there's nothing left).
  const hasMore =
    typeof data.hasMore === "boolean"
      ? data.hasMore
      : items.length === PAGE_SIZE;

  return { items, hasMore };
}