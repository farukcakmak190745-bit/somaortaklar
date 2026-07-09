"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Shield, Clock, Users } from "lucide-react";
import { getContact } from "@/lib/db-local";

export default function About() {
  const [contact, setContact] = useState(getContact());

  useEffect(() => {
    const loadContact = async () => {
      const data = await getContact();
      setContact(data);
    };
    loadContact();
  }, []);

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-blue-900/90 via-navy-900/85 to-blue-900/90 text-blue-200">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Biz Kimiz?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {contact ? "Soma'nın en güvenilir oto çekici ve yol yardım firmasıyız" : "Soma'nın en güvenilir oto çekici ve yol yardım firmasıyız"}
          </p>
        </motion.div>

        {/* About Content */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-blue-800/30 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Hakkımızda</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Biz Kimiz?
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Soma Ortaklar Yol Yardım olarak, Manisa&apos;nın Soma ilçesinde kurulu profesyonel oto çekici ve yol yardım firmasıyız. Soma çekici, Soma oto çekici ve Soma yol yardım hizmetlerinde bölgenin en güvenilir ismi olarak yıllardır araç sahiplerinin yanında oluyoruz. En zor anlarda, en hızlı çözümü sunmak için 7 gün 24 saat yoldayız.
            </p>
          </div>

          <div className="bg-blue-800/30 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Geniş Hizmet Ağımız</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Soma merkezli çekici hizmetimizle Manisa&apos;nın tüm ilçelerini kapsayan geniş bir hizmet ağına sahibiz. Soma, Ahmetli, Akhisar, Alaşehir, Demirci, Gölmarmara, Gördes, Kınık, Kırkağaç, Köprübaşı, Salihli, Sarıgöl, Saruhanlı, Şehzadeler, Turgutlu, Yunusemre ve Savaştepe genelinde profesyonel çekici ekiplerimiz her an hizmete hazır beklemektedir.
            </p>
          </div>

          <div className="bg-blue-800/30 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Neden Bizi Seçmelisiniz?</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-300 mt-0.5" />
                  <span><strong>7/24 Soma Çekici Hizmeti:</strong> Gece gündüz, hafta sonu ve resmi tatillerde ekibimiz her an yolda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Truck className="w-5 h-5 text-blue-300 mt-0.5" />
                  <span><strong>Geniş Hizmet Ağı:</strong> Soma ve Manisa ilçelerinin tamamına ortalama 20–30 dakika içinde ulaşım.</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-300 mt-0.5" />
                  <span><strong>Profesyonel Çekici Ekibi:</strong> Lisanslı, deneyimli ve alanında uzman oto çekici operatörleri.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-blue-300 mt-0.5" />
                  <span><strong>Şeffaf Fiyatlandırma:</strong> Gizli ücret yok; anlaşılan fiyat, ödenen fiyattır.</span>
                </li>
              </ul>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong>Modern Çekici Araç Filosu:</strong> Her türlü kara taşıtına uygun, son teknoloji çekici araçlar.<br />
              <strong>Hasarsız Taşıma Garantisi:</strong> Aracınız bize teslim edildiği gibi teslim edilir.
            </p>
          </div>

          <div className="bg-blue-800/30 rounded-2xl p-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Soma çekici, Soma oto çekici, araç kurtarma, lastik değişimi, akü takviyesi veya yol yardım hizmetlerine ihtiyaç duyduğunuz her an Soma Ortaklar Yol Yardım olarak hemen yanınızdayız. Soma ve Manisa genelinde oto çekici denildiğinde akla gelen ilk isim olmaktan gurur duyuyoruz.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
