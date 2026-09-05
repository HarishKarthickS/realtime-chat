import type { Metadata } from "next";
import { Archivo_Narrow, Pacifico } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const script = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const narrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-narrow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "realtime-chat",
  description: "Vinyl booths, chrome rims, and a neon napkin bar for late talk.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${script.variable} ${narrow.variable}`}>
        <div className="neon-halo" aria-hidden />
        {children}
      </body>
    </html>
  );
}
