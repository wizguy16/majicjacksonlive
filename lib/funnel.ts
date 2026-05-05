/**
 * Validates `NEXT_PUBLIC_FUNNEL_OUT_URL`. Only `http:` / `https:` allowed.
 * Malformed or unsafe values fall back to https://example.com
 */
export function resolveFunnelOutUrl(raw: string | undefined): {
  url: string;
  usedFallback: boolean;
} {
  const val = (raw ?? "").trim();
  if (!val) return { url: "https://example.com", usedFallback: true };
  try {
    const u = new URL(val);
    if (u.protocol === "http:" || u.protocol === "https:") {
      return { url: u.toString(), usedFallback: false };
    }
  } catch {
    /* invalid URL */
  }
  return { url: "https://example.com", usedFallback: true };
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
