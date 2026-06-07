/**
 * restaurantsApi.js
 *
 * Paginated data-access helper for the restaurants list.
 * NOTE: This file is not currently imported by any component.
 * It can be used in the future if you want server-side pagination
 * by pointing PROXY_BASE at /api (the Cloudflare Pages Function).
 *
 * To use, import fetchRestaurants() into Restaurants.js and call it
 * with a page number instead of slicing the Swiggy API response.
 */

const PROXY_BASE = "/api";
export const PAGE_SIZE = 15;

/**
 * Fetch a single page of restaurants.
 * @param {number} page  1-based page number
 * @param {{ lat: number, lng: number }} coords  User coordinates
 * @returns {Promise<{ items: Array, hasMore: boolean }>}
 */
export async function fetchRestaurants(
  page,
  coords = { lat: 19.2128808, lng: 73.15303109999999 }
) {
  const offset = (page - 1) * PAGE_SIZE;
  const url =
    `${PROXY_BASE}/dapi/restaurants/list/v5` +
    `?lat=${coords.lat}&lng=${coords.lng}` +
    `&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING` +
    `&offset=${offset}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to load restaurants (HTTP ${res.status})`);
  }

  const data = await res.json();
  const items =
    data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants ?? [];

  const hasMore = items.length === PAGE_SIZE;

  return { items, hasMore };
}
