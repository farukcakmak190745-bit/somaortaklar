"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90">
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
            İletişime Geçin
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Sorularınız veya hizmet talepleriniz için bizimle iletişime geçin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Bilgilerimiz
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Send,
                    label: "Hizmet Bizi Ara",
                    value: "0507 104 50 54",
                    href: "tel:+905071045054",
                  },
                  {
                    icon: Send,
                    label: "Acil Çağrı",
                    value: "0507 104 50 54",
                    href: "tel:+905071045054",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@somaortaklaryolyardim.com",
                    href: "mailto:info@somaortaklaryolyardim.com",
                  },
                  {
                    icon: MapPin,
                    label: "Adres",
                    value: "Turgutalp Mh. Bergama Cd. Özgür Sk. No:11/A SOMA/MANİSA",
                    href: null,
                  },
                  {
                    icon: Clock,
                    label: "Çalışma Saatleri",
                    value: "24 Saat Hizmet Veriyoruz",
                    href: null,
                  },
                  {
                    icon: MapPin,
                    label: "Hizmet Bölgesi",
                    value: "Soma, Ahmetli, Akhisar, Alaşehir, Demirci, Gölmarmara, Gördes, Kınık, Kırkağaç, Köprübaşı, Salihli, Sarıgöl, Saruhanlı, Şehzadeler, Turgutlu, Yunusemre, Savaştepe",
                    href: null,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-blue-900/30 rounded-xl border border-blue-800/20 hover:border-blue-700/30 transition-colors duration-300"
                  >
                    <div className="p-3 bg-blue-700 rounded-lg flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-300 text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white font-semibold hover:text-blue-300 transition-colors duration-200 block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-semibold">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+905071045054"
                className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span>Hemen Ara</span>
              </a>

              <a
                href="https://wa.me/905071045054"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="text-xl">WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-blue-900/40 p-8 rounded-2xl border border-blue-800/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Mesaj Gönder
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-300 mb-2"
                  >
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-blue-800/50 rounded-xl focus:border-blue-600 focus:ring-0 transition-colors duration-200 outline-none bg-blue-900/20 text-white placeholder-blue-400/50"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-blue-300 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border-2 border-blue-800/50 rounded-xl focus:border-blue-600 focus:ring-0 transition-colors duration-200 outline-none bg-blue-900/20 text-white placeholder-blue-400/50"
                    placeholder="+90 555 ..."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Hizmet
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border-2 border-blue-800/50 rounded-xl focus:border-blue-600 focus:ring-0 transition-colors duration-200 outline-none bg-blue-900/20 text-white"
                >
                  <option value="">Seçiniz</option>
                  <option value="oto-cekici" className="bg-blue-900">Oto Çekici</option>
                  <option value="sehirlerarası-cekici" className="bg-blue-900">Şehirlerarası Çekici</option>
                  <option value="kaza-cekici" className="bg-blue-900">Kaza Çekici</option>
                  <option value="aku-takviyesi" className="bg-blue-900">Akü Takviyesi</option>
                  <option value="lastik-degisi" className="bg-blue-900">Lastik Değişimi</option>
                  <option value="yakit-ikmali" className="bg-blue-900">Yakıt İkmali</option>
                  <option value="diğer" className="bg-blue-900">Diğer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-800/50 rounded-xl focus:border-blue-600 focus:ring-0 transition-colors duration-200 outline-none resize-none bg-blue-900/20 text-white placeholder-blue-400/50"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Gönder</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
