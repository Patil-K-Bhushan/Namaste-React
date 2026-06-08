/**
 * API constants
 *
 * All Swiggy API calls are routed through the /api/* Cloudflare Pages
 * Function (functions/api/[[path]].js) in production, and through the
 * .proxyrc.json proxy during local `npm start` — both bypass CORS.
 *
 * Location-dependent URLs are FUNCTIONS that take a coords object
 * `{ lat, lng }`. If coords is ever missing (undefined/null) they fall
 * back to FALLBACK_COORDS instead of crashing — so a partial deploy or
 * a render before location resolves can never break the page.
 */

const PROXY_BASE = "/api";

// Default location: Badlapur, Maharashtra
const FALLBACK_COORDS = { lat: 19.2128808, lng: 73.15303109999999 };

// Safely pull lat/lng from whatever was passed in
const coordsOf = (coords) => coords || FALLBACK_COORDS;

// ── Location-dependent endpoints (call as functions) ────────────────

export const SWIGGY_API = (coords) => {
  const { lat, lng } = coordsOf(coords);
  return `${PROXY_BASE}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
};

export const MENU_API = (coords, restaurantId) => {
  const { lat, lng } = coordsOf(coords);
  return `${PROXY_BASE}/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;
};

export const COLLECTION_URL = (coords, collectionId, tag) => {
  const { lat, lng } = coordsOf(coords);
  return `${PROXY_BASE}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionId}&tags=${tag}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
};

export const PRE_SEARCH = (coords) => {
  const { lat, lng } = coordsOf(coords);
  return `${PROXY_BASE}/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`;
};

export const SEARCH_API = (coords, query) => {
  const { lat, lng } = coordsOf(coords);
  return `${PROXY_BASE}/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&trackingId=undefined&submitAction=ENTER&str=${query}`;
};

// ── Location-independent image CDNs (plain strings) ─────────────────

export const DISHES_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const IMG_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/";

export const MENU_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";
