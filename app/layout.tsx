import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "vLend — Borrow Without Limits",
  description:
    "Deposit WETH. Mint vUSD. A collateralized borrowing protocol for the MegaETH ecosystem. Over-collateralized lending with Stability Pool, Dutch auctions, and VLEND governance.",
  openGraph: {
    title: "vLend — Borrow Without Limits",
    description:
      "Deposit WETH. Mint vUSD. A collateralized borrowing protocol for the MegaETH ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmMono.variable} ${dmSans.variable} antialiased`}
      >
        <CustomCursor />
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
