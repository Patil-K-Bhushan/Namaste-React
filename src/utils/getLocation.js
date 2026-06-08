/**
 * getLocation.js
 *
 * Resolves the user's coordinates using the browser Geolocation API.
 *
 * - Returns a Promise that ALWAYS resolves (never rejects), so callers
 *   don't need try/catch — on denial/error/timeout it falls back to the
 *   default location (Badlapur, Maharashtra).
 * - Caches the result in sessionStorage so the user is only prompted once
 *   per browser session.
 *
 * Note: Geolocation only works in a secure context — HTTPS or localhost.
 * Your deployed Cloudflare Pages site is HTTPS, and `npm start` runs on
 * localhost, so both are fine.
 */

export const DEFAULT_COORDS = {
  lat: 19.2128808,
  lng: 73.15303109999999,
};

const CACHE_KEY = "userCoords";

export const getUserLocation = () =>
  new Promise((resolve) => {
    // 1. Reuse coords already resolved this session
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) return resolve(JSON.parse(cached));
    } catch {
      // sessionStorage unavailable (private mode etc.) — continue
    }

    // 2. No Geolocation support → default
    if (!navigator.geolocation) {
      return resolve(DEFAULT_COORDS);
    }

    // 3. Ask the browser for the user's position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(coords));
        } catch {
          // ignore cache write failure
        }
        resolve(coords);
      },
      // Permission denied / unavailable / timeout → default
      () => resolve(DEFAULT_COORDS),
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10 * 60 * 1000, // accept a position up to 10 min old
      }
    );
  });
