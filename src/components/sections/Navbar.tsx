"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Truck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hash linkleri için scroll handler
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== "") {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Sayfa yüklendiğinde ve URL hash'i varsa çalıştır
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Hash URL'leri için handler
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    e.preventDefault();
    if (isHash && href !== "") {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false); // Mobil menüyü kapat
        // URL hash'i güncelle
        if (window.location.hash !== href) {
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Anasayfa", href: "/", isHash: false },
    { name: "Hakkımızda", href: "#about", isHash: true },
    { name: "Hizmetlerimiz", href: "#services", isHash: true },
    { name: "Referanslar", href: "#testimonials", isHash: true },
    { name: "İletişim", href: "#contact", isHash: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/95 backdrop-blur-md shadow-xl py-3 border-b border-white/5"
          : "bg-navy-950 py-4 shadow-xl"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <Truck className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
              <div className="text-lg font-bold text-white leading-tight tracking-wide">
                SOMA ORTAKLAR YOL YARDIM
              </div>
              <div className="text-xs text-blue-200 font-semibold tracking-wider uppercase">
                7/24 YOL YARDIM HİZMETLERİ
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.isHash ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href, item.isHash)}
                  className="text-white hover:text-blue-300 transition-colors duration-200 font-medium cursor-pointer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Truck className="w-5 h-5" />
              <span>Hemen Ara</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-navy-900 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.isHash ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleHashClick(e, item.href, item.isHash)}
                    className="text-white hover:text-blue-300 transition-colors duration-200 font-medium text-lg cursor-pointer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-blue-300 transition-colors duration-200 font-medium text-lg"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Truck className="w-5 h-5" />
                <span>Hemen Ara</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
