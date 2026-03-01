import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Examen Teoría Política y Derechos Humanos | Trabajo Social Zaragoza",
  description: "Sistema de evaluación tipo Saber Pro para estudiantes de Trabajo Social - Zaragoza, Antioquia. Preparación en teoría política, regímenes, democracia y derechos humanos.",
  keywords: ["Saber Pro", "Teoría Política", "Derechos Humanos", "Trabajo Social", "Zaragoza Antioquia", "Examen", "Democracia", "Colombia"],
  authors: [{ name: "Prof. Roger Arias" }],
  icons: {
    icon: "/icons-quiz.png",
  },
  openGraph: {
    title: "Examen Teoría Política - Trabajo Social Zaragoza",
    description: "Sistema de evaluación tipo Saber Pro - Bajo Cauca Antioqueño",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
