import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DEVSTEP | Sanctuaire des Développeurs",
  description: "Hébergez et partagez vos projets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* SCRIPTS POUR LE BOT DE SÉCURITÉ (Zéro-installation) */}
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
        <script src="https://cdn.jsdelivr.net/npm/nsfwjs"></script>
      </head>
      <body className={`${inter.className} bg-[#0b0e14] antialiased`}>
        {children}
      </body>
    </html>
  );
}