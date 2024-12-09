import type { Metadata } from "next";
import "./globals.css";
import { YSText, YSTextWide } from "./fonts";

export const metadata: Metadata = {
  title: "Konnekt Echo",
  description: "WebSocket and UDP powered Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${YSTextWide.variable} ${YSText.variable}`}>
      <body>{children}</body>
    </html>
  );
}
