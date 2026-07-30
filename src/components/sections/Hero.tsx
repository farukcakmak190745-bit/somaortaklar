"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getHero, getSliders } from "@/lib/db-local";
import type { Slider } from "@/types";

export default function Hero() {
  const [hero, setHero] = useState<ReturnType<typeof getHero>>(() => {
    const db = getHero();
    return db;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [mounted, setMounted] = useState(false);
  const currentSlider = sliders[currentIndex] ?? sliders[0] ?? {
    imageUrl: 'https://images.unsplash.com/photo-1621922688158-5092bdb99b12?w=1920&q=80'
  };

  useEffect(() => {
    const loadData = async () => {
      const heroData = getHero();
      setHero(heroData);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadMounted = async () => {
      setMounted(true);
      const slidersData = getSliders();
      setSliders(slidersData);
    };
    loadMounted();
  }, []);

  useEffect(() => {
    if (!mounted || sliders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, sliders]);

  const content = (
    <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-wide"
        >
          {hero.title || "SOMA ÇEKİCİ & YOL YARDIM HİZMETLERİ"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto uppercase tracking-wide"
        >
          {hero.subtitle || "Soma Bölgesinde 7/24 Oto Çekici, Oto Kurtarma ve Yol Yardım Hizmeti"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="tel:+905071045054"
            className="inline-flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-600 text-white px-12 py-5 rounded-2xl font-bold text-lg uppercase tracking-wide transition-all duration-300 shadow-2xl hover:shadow-4xl hover:scale-105"
          >
            <Phone className="w-6 h-6" />
            <span>Hemen Ara</span>
          </Link>
          <Link
            href="https://wa.me/905071045054"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-2xl font-bold text-lg uppercase tracking-wide transition-all duration-300 shadow-2xl hover:shadow-4xl hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            <span>WhatsApp</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );

  if (!mounted) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1621922688158-5092bdb99b12?w=1920&q=80"
            alt="Soma Çekici Yol Yardım"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-navy-900/70 to-navy-950/80" />
        </div>
        {content}
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          key={currentSlider?.imageUrl}
          src={currentSlider?.imageUrl || "https://images.unsplash.com/photo-1621922688158-5092bdb99b12?w=1920&q=80"}
          alt={hero.title || "Soma Çekici"}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-navy-900/70 to-navy-950/80" />
      </div>

      {content}

      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-3">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-amber-400 w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
