import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Confrérie des Chipies",
  description:
    "Plateforme officielle de la communauté gaming Confrérie des Chipies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-black text-white">
        <AuthProvider>
          {children}

          <Toaster
            richColors
            position="bottom-right"
            closeButton
          />
        </AuthProvider>
      </body>
    </html>
  );
}