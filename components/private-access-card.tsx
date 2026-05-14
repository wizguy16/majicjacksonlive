"use client";

import Image from "next/image";
import { Check, ImageIcon, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  getPremiumChatProfileUrl,
  getPremiumChatSignupUrl,
} from "@/lib/private-access";

const AVATAR_PATH = process.env.NEXT_PUBLIC_CREATOR_AVATAR_PATH?.trim();
function ChatBubblesIcon({ className = "" }: { className?: string }) {
  /** Solid periwinkle — matches reference screenshot */
  const fill = "#8194EA";

  return (
    <svg
      width="22"
      height="17"
      viewBox="0 0 22 17"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Rear: larger, left; tail down-right */}
      <rect
        x="0.5"
        y="3.25"
        width="12"
        height="6.75"
        rx="2"
        ry="2"
        fill={fill}
      />
      <path d="M 8.35 10 L 11.35 14.25 L 10.15 10 Z" fill={fill} />

      {/* Front: smaller, overlaps rear; tail down-left */}
      <rect
        x="7.75"
        y="1"
        width="9.75"
        height="7.25"
        rx="1.85"
        ry="1.85"
        fill={fill}
      />
      <path d="M 9.1 8.25 L 7.15 12.85 L 10.55 8.25 Z" fill={fill} />
    </svg>
  );
}
const GALLERY_PATH =
  process.env.NEXT_PUBLIC_CREATOR_GALLERY_IMAGE?.trim() || AVATAR_PATH;

/** Copy matches Premium.Chat pre-authorization explainer. */
const PREAUTH_INFO_COPY =
  "Your card will be temporarily pre-authorized by Premium.Chat for $15.00 (up to 15 minutes). You will only be charged if the session takes place. If you continue beyond the session length, additional pre-authorizations will be made. If this request is not answered or canceled, we will void this pre-authorization immediately.";

type PrivateAccessCardProps = {
  variant?: "default" | "compact";
  className?: string;
};

export function PrivateAccessCard({
  variant = "default",
  className = "",
}: PrivateAccessCardProps) {
  const profileUrl = getPremiumChatProfileUrl();
  const signupUrl = getPremiumChatSignupUrl();
  const isCompact = variant === "compact";
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const dialogLabelId = useId();
  const infoDialogId = useId();
  const preauthTitleId = useId();
  const galleryTitleId = useId();
  const scrollLockDepth = useRef(0);
  const savedOverflow = useRef<string | null>(null);

  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  const lockBodyScroll = useCallback(() => {
    if (scrollLockDepth.current === 0) {
      savedOverflow.current = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
    }
    scrollLockDepth.current += 1;
  }, []);

  const unlockBodyScroll = useCallback(() => {
    scrollLockDepth.current = Math.max(0, scrollLockDepth.current - 1);
    if (scrollLockDepth.current === 0 && savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current;
      savedOverflow.current = null;
    }
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [galleryOpen, lockBodyScroll, unlockBodyScroll]);

  useEffect(() => {
    if (!infoOpen) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [infoOpen, lockBodyScroll, unlockBodyScroll]);

  useEffect(() => {
    if (!galleryOpen && !infoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (infoOpen) setInfoOpen(false);
      else if (galleryOpen) closeGallery();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen, infoOpen, closeGallery]);

  const maxW = isCompact
    ? "max-w-[240px] sm:max-w-[252px]"
    : "max-w-[260px] sm:max-w-[280px]";
  const avatarClass = isCompact
    ? "h-[4.25rem] w-[4.25rem]"
    : "h-[4.75rem] w-[4.75rem]";
  const galleryRemote = GALLERY_PATH
    ? /^https?:\/\//i.test(GALLERY_PATH)
    : false;

  /**
   * Single diagonal seam: bottom-left → up the right edge (strong cut toward the bio).
   * `calc(100% - …rem)` keeps slope consistent as padding changes (unlike % of height).
   */
  const lightClip = isCompact
    ? "polygon(0 0, 100% 0, 100% calc(100% - 3.5rem), 0 100%)"
    : "polygon(0 0, 100% 0, 100% calc(100% - 6rem), 0 100%)";

  return (
    <>
      <article
        className={`relative mx-auto overflow-hidden rounded-xl bg-black shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-black/20 ${maxW} ${className}`}
      >
        <div className="relative">
          <div
            className={`relative z-10 bg-white px-3 pt-2 text-black ${isCompact ? "pb-14" : "pb-16"}`}
            style={{ clipPath: lightClip }}
          >
            <header className="flex items-start justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-md border border-[#e4e0f7] bg-[#f6f4ff] px-2 py-1">
                <ChatBubblesIcon className="shrink-0" />
                <span className="text-[11px] font-medium leading-none text-[#4a4a4a]">
                  Chat
                </span>
              </div>
              <a
                href={signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md bg-[#2f80ed] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-[#256dcc]"
              >
                Sign Up
              </a>
            </header>

            <div className="mt-3 flex justify-center">
              {AVATAR_PATH ? (
                <div
                  className={`relative ${avatarClass} overflow-hidden rounded-full bg-neutral-200 ring-[2.5px] ring-[#22c55e] ring-offset-2 ring-offset-white`}
                >
                  <Image
                    src={AVATAR_PATH}
                    alt="majicjackson"
                    width={isCompact ? 68 : 76}
                    height={isCompact ? 68 : 76}
                    className="h-full w-full object-cover"
                    priority={variant === "default"}
                    unoptimized={/^https?:\/\//i.test(AVATAR_PATH)}
                  />
                </div>
              ) : (
                <div
                  className={`flex ${avatarClass} items-center justify-center rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 text-sm font-bold text-neutral-500 ring-[2.5px] ring-[#22c55e] ring-offset-2 ring-offset-white`}
                  aria-label="majicjackson"
                >
                  MJ
                </div>
              )}
            </div>

            <div className="mt-2.5 flex items-center justify-center gap-1">
              <span
                className={`font-bold text-neutral-900 ${isCompact ? "text-[15px]" : "text-base"}`}
              >
                majicjackson
              </span>
              <span
                className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#2f80ed] text-white shadow-sm"
                title="Verified"
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              </span>
            </div>

            <p
              className={`mx-auto mt-2 max-w-[15.5rem] text-center text-[11px] leading-snug text-neutral-800 ${isCompact ? "px-0.5" : "px-1"}`}
            >
              I flirt like a therapist with no boundaries and a wicked sense of
              humor. Tell me your secrets. I&apos;ll tell you what they really
              mean. 😉
            </p>
          </div>

          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            disabled={!GALLERY_PATH}
            className={`absolute left-1/2 top-full z-[60] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-md border border-zinc-600 bg-zinc-700 px-2 py-1 text-zinc-100 shadow-md ring-1 ring-black/25 transition-[transform,box-shadow,background-color] hover:bg-zinc-600 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${isCompact ? "scale-[0.96]" : ""}`}
            aria-haspopup="dialog"
            aria-expanded={galleryOpen}
            aria-controls={dialogLabelId}
          >
            <ImageIcon
              className="h-3.5 w-3.5 shrink-0 text-zinc-300"
              strokeWidth={2}
            />
            <span className="text-xs font-semibold tabular-nums leading-none text-zinc-200">
              1
            </span>
          </button>
        </div>

        <div
          className={`relative z-0 bg-black px-3 pb-3 text-center text-white ${isCompact ? "-mt-5 pt-12" : "-mt-6 pt-16 sm:pt-[4.25rem]"}`}
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            TOPIC
          </p>
          <h2
            className={`mt-1 font-bold leading-tight tracking-tight text-white ${isCompact ? "text-[15px]" : "text-base"}`}
          >
            Your Favorite Bad Decision
          </h2>
          <p className="mx-auto mt-1.5 max-w-[15rem] text-[10px] leading-relaxed text-neutral-300">
            Come keep me company. Flirty conversations, compliments, tension, and
            a little trouble.
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 rounded-full border-2 border-[#7c3aed] bg-white px-2 py-0.5 text-[9px] font-semibold text-neutral-900">
              <span className="text-[11px]" aria-hidden>
                😈
              </span>
              Adult (NSFW)
            </span>
            <span className="inline-flex items-center rounded-full border-2 border-[#2f80ed] bg-white px-2 py-0.5 text-[9px] font-semibold text-neutral-900">
              Anything - Sex Talk
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            <span
              className={`font-bold tabular-nums text-white ${isCompact ? "text-[22px]" : "text-[24px]"}`}
            >
              $15.00
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-neutral-600 px-1.5 py-0.5 pl-2 text-[8px] font-bold uppercase leading-none tracking-wide text-white">
              Flat Rate
              <button
                type="button"
                aria-expanded={infoOpen}
                aria-controls={infoDialogId}
                aria-label="Pre-authorization details"
                onClick={(e) => {
                  e.stopPropagation();
                  setInfoOpen(true);
                }}
                className="ml-0.5 flex h-3.5 w-3.5 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#f5d547] p-0 text-[9px] font-bold text-neutral-900 transition-transform hover:scale-105 active:scale-95"
              >
                i
              </button>
            </span>
          </div>
          <p className="mt-1 text-[9px] text-neutral-500">
            For up to 15 minutes
          </p>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center rounded-full bg-white py-2.5 text-center text-[12px] font-semibold text-neutral-900 shadow-sm transition-[filter,transform] hover:brightness-[0.98] active:scale-[0.99]"
          >
            Let&apos;s Chat Now!
          </a>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-[9px] text-neutral-500">
            <span>Powered by</span>
            <span className="inline-flex items-center gap-0.5 rounded bg-[#10b981] px-1 py-px font-semibold text-white">
              <span className="text-[8px]" aria-hidden>
                $
              </span>
              Premium.Chat
            </span>
          </div>
        </div>
      </article>

      {galleryOpen && GALLERY_PATH ? (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/55 p-4"
          role="presentation"
          onClick={closeGallery}
        >
          <div
            id={dialogLabelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={galleryTitleId}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-sm transition-colors hover:bg-white hover:text-black"
              onClick={closeGallery}
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>

            <div className="relative aspect-[3/4] w-full bg-neutral-200">
              <Image
                src={GALLERY_PATH}
                alt="Gallery"
                fill
                className="object-cover"
                sizes="320px"
                unoptimized={galleryRemote}
                priority
              />
            </div>

            <div className="px-5 pb-5 pt-4 text-center text-black">
              <div
                id={galleryTitleId}
                className="flex items-center justify-center gap-1.5 text-sm text-neutral-600"
              >
                <ChatBubblesIcon />
                <span className="font-medium">Chat</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="text-2xl font-bold tabular-nums">$15.00</span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-neutral-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                  Flat Rate
                  <button
                    type="button"
                    aria-expanded={infoOpen}
                    aria-controls={infoDialogId}
                    aria-label="Pre-authorization details"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInfoOpen(true);
                    }}
                    className="flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full border-0 bg-[#f5d547] p-0 text-[9px] font-bold text-neutral-900 transition-transform hover:scale-105 active:scale-95"
                  >
                    i
                  </button>
                </span>
              </div>

              <p className="mt-2 text-xs text-neutral-500">
                For up to{" "}
                <strong className="text-neutral-900">15 minutes</strong>
              </p>

              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 text-center text-sm font-semibold text-white shadow-sm transition-[filter,transform] hover:brightness-105 active:scale-[0.99]"
              >
                Let&apos;s Chat Now!
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {infoOpen ? (
        <div
          className="fixed inset-0 z-[320] flex items-center justify-center bg-black/35 p-4"
          role="presentation"
          onClick={() => setInfoOpen(false)}
        >
          <div
            id={infoDialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={preauthTitleId}
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-xl border border-neutral-200 bg-white px-5 py-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p id={preauthTitleId} className="sr-only">
              Pre-authorization information
            </p>
            <p className="text-center text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
              {PREAUTH_INFO_COPY}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
