import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell>
      <main className="flex w-full max-w-md flex-col items-center gap-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#ff0000]">
          Access Restricted
        </p>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl">
            This page isn&apos;t public.
          </h1>
          <p className="text-base text-black">
            You either have access… or you don&apos;t.
          </p>
        </div>

        <div className="aspect-square w-full overflow-hidden rounded-none border-4 border-black bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/tease.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="text-center text-base font-semibold text-black">
          If you&apos;re here, you already know why.
        </p>

        <div className="flex w-full flex-col gap-3">
          <Link
            href="/intent"
            className="flex min-h-12 w-full items-center justify-center rounded-none border-2 border-black bg-[#e02020] px-3 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:min-h-[3rem] sm:py-4 sm:text-base"
          >
            Enter Private Session →
          </Link>
          <Link
            href="/intent"
            className="flex min-h-12 w-full items-center justify-center rounded-none border-2 border-black bg-white px-3 py-3 text-center text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90 sm:min-h-[3rem] sm:py-4 sm:text-base"
          >
            Request Access →
          </Link>
        </div>

        <p className="text-center text-[11px] uppercase tracking-wide text-black">
          Encrypted • 18+ only • monitored session
        </p>
      </main>
    </PageShell>
  );
}
