import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Private Access",
  description: "Private access funnel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className="min-h-full bg-white text-black antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
