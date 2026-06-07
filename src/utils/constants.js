/**
 * API constants — all Swiggy API calls are routed through the
 * /api/* Cloudflare Pages Function (functions/api/[[path]].js)
 * which proxies requests server-side, bypassing the browser CORS block.
 *
 * To change the location, update the lat/lng parameters below.
 * Default location: Badlapur, Maharashtra (19.2128808, 73.15303109999999)
 */

const PROXY_BASE = "/api";

export const SWIGGY_API =
  `${PROXY_BASE}/dapi/restaurants/list/v5?lat=19.2128808&lng=73.15303109999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

export const DISHES_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const IMG_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/";

export const MENU_API =
  `${PROXY_BASE}/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.2128808&lng=73.15303109999999&restaurantId=`;

export const MENU_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

export const COLLECTION_URL = (collectionId, tag) => {
  return `${PROXY_BASE}/dapi/restaurants/list/v5?lat=19.2128808&lng=73.15303109999999&collection=${collectionId}&tags=${tag}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
};

export const PRE_SEARCH =
  `${PROXY_BASE}/dapi/landing/PRE_SEARCH?lat=19.2128808&lng=73.15303109999999`;

export const SEARCH_API =
  `${PROXY_BASE}/dapi/restaurants/search/v3?lat=19.2128808&lng=73.15303109999999&trackingId=undefined&submitAction=ENTER&str=`;
