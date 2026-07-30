"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingContact from "@/components/sections/FloatingContact";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const checkAdminPage = async () => {
      // Check if current path is admin page
      setIsAdminPage(window.location.pathname.startsWith('/admin'));
    };
    checkAdminPage();
  }, []);

  return (
    <html lang="tr">
      <body className={inter.className}>
        {!isAdminPage && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <FloatingContact />}
      </body>
    </html>
  );
}
