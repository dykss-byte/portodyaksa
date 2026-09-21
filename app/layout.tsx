import type { Metadata } from "next";
import { Lilita_One, Fredoka } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lilitaOne = Lilita_One({
  weight: "400",
  variable: "--font-lilita",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const waltograph = localFont({
  src: "../public/fonts/waltograph42.ttf",
  variable: "--font-waltograph",
  display: "swap",
});

const gillSansUltra = localFont({
  src: "../public/fonts/GillSansUltraBold.ttf",
  variable: "--font-gill-sans",
  display: "swap",
});

const agentOrange = localFont({
  src: "../public/fonts/AgentOrange.ttf",
  variable: "--font-agent-orange",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dyaksa Wiratara | Official Toy Story Portfolio - SMKN 1 Jenangan Ponorogo",
  description: "Portofolio personal interaktif Toy Story untuk Dyaksa Wiratara - Siswa RPL SMKN 1 Jenangan Ponorogo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${lilitaOne.variable} ${fredoka.variable} ${waltograph.variable} ${gillSansUltra.variable} ${agentOrange.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
