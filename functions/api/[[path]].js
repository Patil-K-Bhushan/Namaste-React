/**
 * Cloudflare Pages Function — Swiggy API Proxy
 *
 * All requests to /api/* are forwarded to www.swiggy.com server-side.
 * Because the request originates from Cloudflare's edge (not the browser),
 * Swiggy's CORS policy does not apply. The response is returned to the
 * browser with `Access-Control-Allow-Origin: *` so the frontend can read it.
 *
 * Route: /api/[[path]]  →  https://www.swiggy.com/<path>?<query>
 *
 * Examples:
 *   GET /api/dapi/restaurants/list/v5?lat=...  →  swiggy.com/dapi/restaurants/list/v5?lat=...
 *   GET /api/mapi/menu/pl?restaurantId=123     →  swiggy.com/mapi/menu/pl?restaurantId=123
 */

export async function onRequest(context) {
  const { request, params } = context;

  // ── CORS pre-flight ──────────────────────────────────────────────
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  // ── Build target URL ─────────────────────────────────────────────
  const url = new URL(request.url);

  // params.path is a string[] of path segments after /api/
  const segments = Array.isArray(params.path)
    ? params.path
    : typeof params.path === "string"
    ? [params.path]
    : [];

  const swiggyPath = segments.length > 0 ? "/" + segments.join("/") : "/";
  const swiggyUrl = `https://www.swiggy.com${swiggyPath}${url.search}`;

  // ── Proxy the request ────────────────────────────────────────────
  try {
    const res = await fetch(swiggyUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Referer: "https://www.swiggy.com/",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-IN,en;q=0.9,en-US;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    });

    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        ...corsHeaders(),
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(),
      },
    });
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };
}
