/**
 * When `FUNNEL_OUT_URL` / `NEXT_PUBLIC_FUNNEL_OUT_URL` is missing or invalid,
 * outbound CTAs use this URL (only `http:` / `https:` env values are accepted).
 */
export const FUNNEL_OUT_URL_FALLBACK =
  "https://go.mavrtracktor.com?onlineModels=majicjackson&userId=c82f71111fc722c320a3043ec79528c0ec4a80f347de9da5e76bc3d98dc3347c";

export function resolveFunnelOutUrl(raw: string | undefined): {
  url: string;
  usedFallback: boolean;
} {
  const val = (raw ?? "").trim();
  if (!val) return { url: FUNNEL_OUT_URL_FALLBACK, usedFallback: true };
  try {
    const u = new URL(val);
    if (u.protocol === "http:" || u.protocol === "https:") {
      return { url: u.toString(), usedFallback: false };
    }
  } catch {
    /* invalid URL */
  }
  return { url: FUNNEL_OUT_URL_FALLBACK, usedFallback: true };
}

/**
 * Deterministic query order: `page` then `src` (stable for logs and caching).
 */
export function funnelHref(
  outUrl: string,
  src: "live" | "vault" | "vip",
  page: string = "intent",
): string {
  try {
    const u = new URL(outUrl);
    u.searchParams.set("page", page);
    u.searchParams.set("src", src);
    return u.toString();
  } catch {
    const sep = outUrl.includes("?") ? "&" : "?";
    const qs = new URLSearchParams({ page, src }).toString();
    return `${outUrl}${sep}${qs}`;
  }
}
