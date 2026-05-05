"use client";

import type { ReactNode } from "react";

type Src = "live" | "vault" | "vip";

/**
 * Outbound funnel CTA with dev-only click trace.
 * Default referrer behavior — many affiliate redirects rely on Referer/cookies.
 */
export function FunnelCta({
  href,
  trackSrc,
  className,
  children,
}: {
  href: string;
  trackSrc: Src;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        if (process.env.NODE_ENV === "development") {
          console.log(`[funnel] click src=${trackSrc} page=intent`);
        }
      }}
    >
      {children}
    </a>
  );
}
