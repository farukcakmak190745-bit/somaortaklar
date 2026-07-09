"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mehmet Kaya",
      location: "Soma, Manisa",
      text: "Gece 01.00'de Soma'da aracım hareket edemez hale geldi. Soma Ortaklar Yol Yardım'ı aradım, 15 dakika içinde çekici kapımdaydı. Soma çekici hizmeti bu kadar hızlı olur diye beklemiyordum. Ekip hem güler yüzlü hem de çok profesyoneldi, kesinlikle tavsiye ediyorum.",
      rating: 5,
      initial: "MK",
      date: "1 hafta önce · Google yorumu",
    },
    {
      id: 2,
      name: "Zeynep Arslan",
      location: "Soma, Manisa",
      text: "Soma'da uzun süredir araç kullanıyorum, daha önce farklı firmalar denedim. Soma yol yardım konusunda Soma Ortaklar ile karşılaştırılacak başka bir firma görmedim. Aküm bittiğinde aradım, gelip yerinde hallettiler. Fiyatı da dürüst, sürpriz çıkmıyor.",
      rating: 5,
      initial: "ZA",
      date: "3 hafta önce · Google yorumu",
    },
    {
      id: 3,
      name: "Serkan Çelik",
      location: "Akhisar, Manisa",
      text: "Akhisar'da kaza yaptım, çok stresliydim ne yapacağımı bilemedim. Akhisar oto çekici diye aratınca Soma Ortaklar Yol Yardım çıktı. Aradım, sakin ve net konuştular, kısa sürede geldiler. Aracımı hasarsız servise teslim ettiler. Akhisar ve çevresinde bu işi en iyi onlar yapıyor.",
      rating: 5,
      initial: "SC",
      date: "2 hafta önce · Google yorumu",
    },
    {
      id: 4,
      name: "Hüseyin Baş",
      location: "Kınık, İzmir",
      text: "Kınık'tan Soma'ya geçerken lastiğim patladı, yolun ortasında mahsur kaldım. Kınık yol yardım diye aradım, Soma Ortaklar'a bağlandım. Düşündüğümden çok daha kısa sürede geldiler. Lastik değişimini hızlıca yaptılar, yoluma devam edebildim. Kınık ve çevresi için güvenle öneririm.",
      rating: 5,
      initial: "HB",
      date: "1 ay önce · Google yorumu",
    },
    {
      id: 5,
      name: "Fatih Yıldız",
      location: "Savaştepe, Balıkesir",
      text: "Savaştepe'de gece aracım yolda kaldı, çevrede çekici bulamadım. Soma yol yardım diye aradım, Soma Ortaklar hemen yola çıktı. Savaştepe gibi şehir merkezinden uzak bir noktaya bu kadar hızlı gelmelerini beklemiyordum. Gerçekten güvenilir bir ekip, tekrar ihtiyacım olsa yine ararım.",
      rating: 5,
      initial: "FY",
      date: "1 ay önce · Google yorumu",
    },
    {
      id: 6,
      name: "Nurcan Özer",
      location: "Kırkağaç, Manisa",
      text: "Kırkağaç'ta yakıtım bitti, ne yapacağımı bilemedim. Kırkağaç yol yardım diye internette arama yaptım, Soma Ortaklar Yol Yardım'a ulaştım. Soma'dan Kırkağaç'a kadar geldiler, yakıt ikmali yaptılar. Kırkağaç çekici ve yol yardım için bu firmayı rahatlıkla önerebilirim.",
      rating: 5,
      initial: "NO",
      date: "2 ay önce · Google yorumu",
    },
  ];

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
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

        {/* Testimonials Grid */}
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
              {/* Stars */}
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

              {/* Quote */}
              <p className="text-blue-200 mb-6 leading-relaxed italic">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-700/50 rounded-full flex items-center justify-center text-white font-bold text-lg border border-blue-600/30">
                  {testimonial.initial}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-400 text-sm">
                    {testimonial.location}
                  </p>
                  <p className="text-blue-300/60 text-xs mt-1">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
