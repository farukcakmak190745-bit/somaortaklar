"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Shield, Clock, Users } from "lucide-react";
import { getAbout } from "@/lib/db-local";
import type { AboutSection } from "@/types";

export default function About() {
  const [about, setAbout] = useState<AboutSection | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = getAbout();
    setAbout(data);
    setMounted(true);
  }, []);

  const renderWhyChooseUs = (items: string[]) => {
    const icons = [Clock, Truck, Shield, Users];
    return items.map((item, index) => {
      const [boldPart, ...rest] = item.split(":");
      const textPart = rest.join(":");
      const Icon = icons[index % icons.length];
      return (
        <li key={index} className="flex items-start gap-2">
          <Icon className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
          <span><strong>{boldPart}:</strong>{textPart}</span>
        </li>
      );
    });
  };

  if (!mounted || !about) {
    return (
      <section id="about" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90 text-blue-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Yükleniyor...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90 text-blue-200">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {about.subtitle || "Biz Kimiz?"}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {about.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16">
          {about.content?.intro && (
            <div className="bg-blue-800/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Hakkımızda</h3>
              <p className="text-lg text-gray-300 leading-relaxed">{about.content.intro}</p>
            </div>
          )}

          {about.content?.serviceArea && (
            <div className="bg-blue-800/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Geniş Hizmet Ağımız</h3>
              <p className="text-lg text-gray-300 leading-relaxed">{about.content.serviceArea}</p>
            </div>
          )}

          {about.content?.whyChooseUs && about.content.whyChooseUs.length > 0 && (
            <div className="bg-blue-800/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Neden Bizi Seçmelisiniz?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {renderWhyChooseUs(about.content.whyChooseUs)}
              </div>
            </div>
          )}

          {about.content?.closing && (
            <div className="bg-blue-800/30 rounded-2xl p-8">
              <p className="text-lg text-gray-300 leading-relaxed">{about.content.closing}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
