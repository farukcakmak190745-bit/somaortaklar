"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/db-local";
import type { Testimonial } from "@/types";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = getTestimonials();
    setTestimonials(data);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="testimonials" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Müşterilerimiz Ne Diyor?</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <Quote className="w-10 h-10 text-blue-400" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            On binlerce mutlu müşterimizin deneyimlerini okuyun
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-blue-900/40 p-8 rounded-2xl border border-blue-800/30 shadow-lg hover:shadow-2xl hover:border-blue-700/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-blue-200 mb-6 leading-relaxed italic">
                {testimonial.text}
              </p>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-700/50 rounded-full flex items-center justify-center text-white font-bold text-lg border border-blue-600/30">
                  {testimonial.initial}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  {testimonial.location && (
                    <p className="text-blue-400 text-sm">
                      {testimonial.location}
                    </p>
                  )}
                  {testimonial.date && (
                    <p className="text-blue-300/60 text-xs mt-1">
                      {testimonial.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
