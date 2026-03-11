/*
  Netlify Function: Google Reviews proxy
  - Requires environment variables on Netlify:
    - GOOGLE_API_KEY: Google Maps/Places API key
    - GOOGLE_PLACE_ID: Your Google Business place_id
*/

const PLACE_DETAILS_ENDPOINT = "https://maps.googleapis.com/maps/api/place/details/json";

function buildPlaceUrl(placeId) {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "GET") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID environment variables" }),
      };
    }

    const url = new URL(PLACE_DETAILS_ENDPOINT);
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "url,rating,user_ratings_total,reviews");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("reviews_no_translations", "true");
    url.searchParams.set("reviews_sort", "newest");

    const resp = await fetch(url.toString());
    if (!resp.ok) {
      return { statusCode: resp.status, body: JSON.stringify({ error: `Upstream error: ${resp.statusText}` }) };
    }

    const data = await resp.json();
    if (data.status !== "OK" || !data.result) {
      return { statusCode: 200, body: JSON.stringify({ reviews: [], sourceUrl: buildPlaceUrl(placeId) }) };
    }

    const reviews = Array.isArray(data.result.reviews) ? data.result.reviews : [];

    const mapped = reviews.slice(0, 12).map((r, idx) => ({
      id: `${r.time || idx}`,
      name: r.author_name || "Cliente",
      text: r.text || r.original_text || "",
      avatar: r.profile_photo_url || "",
      rating: typeof r.rating === "number" ? Math.max(1, Math.min(5, Math.round(r.rating))) : 5,
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: mapped, sourceUrl: data.result.url || buildPlaceUrl(placeId) }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Internal error", details: String(err) }) };
  }
};
