"use client";

import { useState, useEffect, createElement } from "react";
import { motion } from "framer-motion";
import { Truck, Globe2, AlertTriangle, Battery, Wrench, Zap, Phone } from "lucide-react";
import { getServices, getContact } from "@/lib/db-local";
import type { LucideIcon } from "lucide-react";

export default function Services() {
  const [services, setServices] = useState<ReturnType<typeof getServices>>([]);
  const [contact, setContact] = useState<ReturnType<typeof getContact>>({ phone: "", phone2: "", email: "", address: "", hours: "" });
  const [mounted, setMounted] = useState(false);

  const loadInitialData = async () => {
    setMounted(true);
    setServices(getServices());
    setContact(getContact());
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadInitialData();
    }
  }, []);

  if (!mounted) {
    return (
    <section id="hizmetlerimiz" className="py-32 bg-gradient-to-b from-navy-900/95 via-navy-950/90 to-navy-900/95">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Yükleniyor...
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Map icon names to Lucide icons
  const getIcon = (iconName: string): LucideIcon | null => {
    const icons: Record<string, LucideIcon> = {
      Truck,
      Globe2,
      AlertTriangle,
      Battery,
      Wrench,
      Zap,
      Phone,
      "truck": Truck,
      "alert-triangle": AlertTriangle,
      "battery": Battery,
      "wrench": Wrench,
      "zap": Zap,
      "phone": Phone,
      "help-circle": Truck, // fallback
    };
    return icons[iconName] || Truck;
  };

  return (
    <section id="hizmetlerimiz" className="py-32 bg-gradient-to-b from-navy-900/95 via-navy-950/90 to-navy-900/95">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hizmetlerimiz
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Soma, Akhisar, Kırkağaç, Savaştepe ve Manisa genelinde 7/24 oto çekici, yol yardım ve oto kurtarma hizmetleri
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-blue-900/40 backdrop-blur-sm rounded-2xl border border-blue-800/30 shadow-lg hover:shadow-2xl hover:border-blue-700/50 transition-all duration-300 overflow-hidden"
            >
              {/* Dark Header Section */}
              <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-900 border-b border-blue-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-700/50 rounded-2xl flex items-center justify-center">
                    {service.icon && getIcon(service.icon) && (
                      service.icon.startsWith('truck') || service.icon.startsWith('alert') ||
                      service.icon.startsWith('battery') || service.icon.startsWith('wrench') ||
                      service.icon.startsWith('zap') || service.icon.startsWith('phone') ?
                      createElement(getIcon(service.icon) as LucideIcon, { className: "w-8 h-8 text-white" }) :
                      null
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-blue-200 text-sm font-medium">{service.area}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-blue-300 mb-6 leading-relaxed text-base">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features?.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3 text-blue-300"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      <span className="flex-1 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={`tel:+905071045054`}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg border border-amber-400/50 block"
                >
                  <Phone className="w-5 h-5" />
                  <span>Hemen ara ↗</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
