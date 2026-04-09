import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Centro Psicológico Emotiva",
  description: "Apoyo psicológico accesible para niños, adolescentes y adultos. Terapia individual, de pareja, familiar y evaluaciones psicológicas en Lima, Perú.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-dark antialiased">{children}</body>
    </html>
  );
}
