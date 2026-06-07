export const SWIGGY_API =
  "https://corsproxy.io/?url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2128808&lng=73.15303109999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const DISHES_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const IMG_CDN = "https://media-assets.swiggy.com/swiggy/image/upload/";

export const MENU_API =
  "https://corsproxy.io/?url=https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.2128808&lng=73.15303109999999&restaurantId=";

export const MENU_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

export const COLLECTION_URL = (collectionId, tag) => {
  return `https://corsproxy.io/?url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2128808&lng=73.15303109999999&collection=${collectionId}&tags=${tag}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
};

export const PRE_SEARCH = "https://corsproxy.io/?url=https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=19.2128808&lng=73.15303109999999"

export const SEARCH_API =
  "https://corsproxy.io/?url=https://www.swiggy.com/dapi/restaurants/search/v3?lat=19.2128808&lng=73.15303109999999&trackingId=undefined&submitAction=ENTER&str=";