import type { Metadata } from "next";
import { AppChrome } from "@/components/app-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Private Access",
  description: "Private access",
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
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
