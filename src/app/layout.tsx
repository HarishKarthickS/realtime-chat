import type { Metadata } from "next";
import { Lato } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "realtime-chat",
  description: "Channels, a message thread, and a composer for live talk.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={lato.variable}>{children}</body>
    </html>
  );
}
