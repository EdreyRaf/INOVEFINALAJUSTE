export type Review = {
  id: string;
  name: string;
  text: string;
  avatar: string;
  rating: number;
};

export async function fetchGoogleReviews(init?: RequestInit): Promise<Review[]> {
  try {
    if (typeof window === "undefined") return [];
    if (import.meta.env && import.meta.env.DEV) return [];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch("/api/google-reviews", {
      method: "GET",
      signal: controller.signal,
      ...(init || {}),
    });
    clearTimeout(timeout);

    if (!res.ok) return [];
    const data = await res.json();
    if (!data || !Array.isArray(data.reviews)) return [];
    return data.reviews as Review[];
  } catch {
    return [];
  }
}
