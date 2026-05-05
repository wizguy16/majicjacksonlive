import { FunnelCta } from "@/components/FunnelCta";
import { PageShell } from "@/components/PageShell";
import { funnelHref, resolveFunnelOutUrl } from "@/lib/funnel";

/**
 * Root funnel URL — set in project root `.env.local`:
 *   NEXT_PUBLIC_FUNNEL_OUT_URL=https://your-actual-affiliate-link.com
 * No quotes. Restart `npm run dev` after editing.
 * For Vercel etc., set the same name in Project → Environment Variables.
 */
const { url: OUT_URL, usedFallback: funnelOutUrlFallback } =
  resolveFunnelOutUrl(process.env.NEXT_PUBLIC_FUNNEL_OUT_URL);

if (process.env.NODE_ENV === "development" && funnelOutUrlFallback) {
  console.warn(
    "⚠️ FUNNEL OUT URL NOT SET — using fallback https://example.com",
  );
}

const btnClass =
  "flex min-h-12 w-full items-center justify-center rounded-none border-2 border-black bg-[#e02020] px-3 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90 sm:min-h-[3rem] sm:py-[1.125rem] sm:text-base";

export default function IntentPage() {
  return (
    <PageShell>
      <main className="flex w-full max-w-md flex-col items-center gap-4 sm:gap-5">
        <header className="flex w-full flex-col gap-1.5 text-center sm:gap-2">
          <h1 className="text-xl font-bold tracking-tight text-black sm:text-2xl md:text-3xl">
            Access granted.
          </h1>
          <p className="text-sm text-black sm:text-base">
            Stay while it&apos;s open.
          </p>
          <p className="text-sm font-semibold text-[#ff0000] sm:text-base">
            Session closes without warning.
          </p>
        </header>

        <div className="flex w-full flex-col gap-3">
          <section className="border-2 border-black bg-white p-3 sm:p-4">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff0000] sm:mb-2">
              Currently active
            </p>
            <h2 className="mb-3 text-base font-bold text-black sm:mb-4 sm:text-lg">
              Live session
            </h2>
            <FunnelCta
              href={funnelHref(OUT_URL, "live", "intent")}
              trackSrc="live"
              className={btnClass}
            >
              Join Now →
            </FunnelCta>
          </section>

          <section className="border-2 border-black bg-white p-3 sm:p-4">
            <h2 className="mb-3 text-base font-bold text-black sm:mb-4 sm:text-lg">
              Locked content archive
            </h2>
            <FunnelCta
              href={funnelHref(OUT_URL, "vault", "intent")}
              trackSrc="vault"
              className={btnClass}
            >
              Unlock Access →
            </FunnelCta>
          </section>

          <section className="border-2 border-black bg-white p-3 sm:p-4">
            <h2 className="mb-3 text-base font-bold text-black sm:mb-4 sm:text-lg">
              Priority / VIP channel
            </h2>
            <FunnelCta
              href={funnelHref(OUT_URL, "vip", "intent")}
              trackSrc="vip"
              className={btnClass}
            >
              Upgrade Entry →
            </FunnelCta>
          </section>
        </div>

        <p className="text-center text-[11px] uppercase tracking-wide text-black">
          Secure connection • instant access
        </p>
      </main>
    </PageShell>
  );
}
