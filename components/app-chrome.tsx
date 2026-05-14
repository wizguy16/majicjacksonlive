"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import { PrivateAccessCard } from "@/components/private-access-card";

export function AppChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b-2 border-black bg-white/95 px-5 backdrop-blur-sm">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.18em] text-black"
          onClick={() => setOpen(false)}
        >
          Private Access
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-none border-2 border-black bg-white text-black transition-opacity hover:opacity-80"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-5 bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-5 bg-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </header>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id={menuId}
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l-2 border-black bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b-2 border-black px-3">
          <button
            type="button"
            className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-black underline-offset-4 hover:underline"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-8 pt-5">
          <div className="mb-5 border-b border-black/10 pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black">
              Private Access
            </p>
          </div>

          <div className="pb-2">
            <PrivateAccessCard variant="compact" className="w-full" />
          </div>

          <ul className="mt-6 flex flex-col gap-0 border-t-2 border-black">
            <li className="border-b-2 border-black">
              <Link
                href="/"
                className="block py-3 text-sm font-semibold uppercase tracking-wide text-black hover:bg-black/[0.03]"
                onClick={() => setOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li className="border-b-2 border-black">
              <Link
                href="/intent#section-vault"
                className="block py-3 text-sm font-semibold uppercase tracking-wide text-black hover:bg-black/[0.03]"
                onClick={() => setOpen(false)}
              >
                Categories
              </Link>
            </li>
            <li className="border-b-2 border-black">
              <Link
                href="/intent#section-live"
                className="block py-3 text-sm font-semibold uppercase tracking-wide text-black hover:bg-black/[0.03]"
                onClick={() => setOpen(false)}
              >
                Trending
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="pt-14">{children}</div>
    </>
  );
}
