"use client";

import type { ReactNode } from "react";

type Src = "live" | "vault" | "vip";

/**
 * Outbound funnel CTA with dev-only click trace.
 * `referrerPolicy="no-referrer"` — remove if your affiliate needs the Referer header.
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
      referrerPolicy="no-referrer"
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
