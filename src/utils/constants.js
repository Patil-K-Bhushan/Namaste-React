/**
 * API constants
 *
 * All Swiggy API calls are routed through the /api/* Cloudflare Pages
 * Function (functions/api/[[path]].js) in production, and through the
 * .proxyrc.json proxy during local `npm start` — both bypass CORS.
 *
 * Location-dependent URLs are now FUNCTIONS that take a coords object
 * `{ lat, lng }`, so the app can use the user's real location instead of
 * a hardcoded one. Get coords from LocationContext (see App.js).
 *
 * Image CDN URLs do not depend on location, so they stay plain strings.
 */

const PROXY_BASE = "/api";

// ── Location-dependent endpoints (call as functions) ────────────────

export const SWIGGY_API = ({ lat, lng }) =>
  `${PROXY_BASE}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

export const MENU_API = ({ lat, lng }, restaurantId) =>
  `${PROXY_BASE}/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

export const COLLECTION_URL = ({ lat, lng }, collectionId, tag) =>
  `${PROXY_BASE}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionId}&tags=${tag}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

export const PRE_SEARCH = ({ lat, lng }) =>
  `${PROXY_BASE}/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`;

const coordsOf = (coords) => coords || FALLBACK_COORDS;

export const SEARCH_API = (coords, query) => {
  const { lat, lng } = coordsOf(coords); // undefined → default, never crashes
  return `/api/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}...`;
};

// ── Location-independent image CDNs (plain strings) ─────────────────

export const DISHES_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const IMG_CDN = "https://media-assets.swiggy.com/swiggy/image/upload/";

export const MENU_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";
