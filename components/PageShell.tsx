import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center px-5 py-8 pb-12">
      {children}
    </div>
  );
}
