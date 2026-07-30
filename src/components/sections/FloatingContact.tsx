"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-3">
        <a
          href="https://wa.me/905071045054"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
          title="WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
        <a
          href="tel:+905071045054"
          className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
          title="Hemen Ara"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-950/95 backdrop-blur-md border-t border-navy-800/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <a
            href="tel:+905071045054"
            className="flex-1 flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            <span>Hemen Ara</span>
          </a>
          <a
            href="https://wa.me/905071045054"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
