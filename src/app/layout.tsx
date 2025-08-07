"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./lib/store/authStore";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const setIsHydrated = useAuthStore((state) => state.setIsHydrated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    setIsHydrated(true);
  }, [setIsHydrated])
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
