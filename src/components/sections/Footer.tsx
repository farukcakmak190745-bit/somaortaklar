"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getFooter, getContact } from "@/lib/db-local";

export default function Footer() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [footer, setFooter] = useState<ReturnType<typeof getFooter>>({ social: { instagram: "", whatsapp: "", facebook: "" }, quickLinks: [], contactInfo: undefined });


  useEffect(() => {
    const loadInitialData = async () => {
      if (typeof window !== 'undefined') {
        setIsAuthenticated(localStorage.getItem('adminAuth') === 'true');
      }

      setFooter(getFooter());
    };
    loadInitialData();
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
    }
    router.push('/admin/login');
    toast.success('Çıkış yapıldı');
  };

  const socialLinks = [
    { name: "Instagram", href: footer.social?.instagram || "#", icon: Instagram, color: "hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500" },
    { name: "WhatsApp", href: footer.social?.whatsapp || "#", icon: Phone, color: "hover:bg-green-600" },
    { name: "Facebook", href: footer.social?.facebook || "#", icon: Facebook, color: "hover:bg-blue-600" }
  ];

  return (
    <footer className="bg-navy-950 text-navy-300">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Admin Link */}
          {isAuthenticated && (
            <div className="lg:col-span-4 border-b border-navy-800 pb-6 mb-6">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center space-x-2 text-navy-400 hover:text-navy-300 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Admin Paneli</span>
              </Link>
            </div>
          )}

          {/* Brand */}
          <div className="space-y-2">
            <div className="text-base font-bold">
              <span className="text-navy-400">Soma</span>
              <span className="text-navy-300">Ortaklar</span>
              <span className="text-navy-400">Yolyardım</span>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed">
              {footer.footerText || "Soma oto çekici ve Soma yol yardım hizmetlerinde bölgenin güvenilir adresi. Manisa Soma merkezli çekici firmamız; Soma çekici, Akhisar çekici, Kınık çekici, Kırkağaç çekici ve Savaştepe çekici hizmetleriyle 7/24 yolunuzda. Aracınız arızalandığında, kaza yaptığınızda veya yolda kaldığınızda Soma oto çekici hattımız tek aramada yanınızda. Oto çekici, oto kurtarma, araç kurtarma, yol yardım, akü takviyesi ve lastik değişimi hizmetleri için Soma Ortaklar Yol Yardım'ı arayın."}
            </p>
            <a
              href="tel:+905071045054"
              className="text-navy-400 text-sm font-medium hover:text-navy-300 transition-colors"
            >
              📞 Levent Yetim (0507 104 50 54)
            </a>
            <p className="text-navy-500 text-xs leading-relaxed">
              {footer.keywords?.join(" · ") || "Soma çekici · Soma oto çekici · Soma yol yardım · Manisa çekici"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-navy-400">Hizmet Bölgeleri</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Soma</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Ahmetli</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Akhisar</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Alaşehir</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Demirci</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Gölmarmara</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Gördes</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Kınık</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Kırkağaç</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Köprübaşı</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Salihli</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Sarıgöl</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Saruhanlı</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Şehzadeler</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Turgutlu</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Yunusemre</span>
              <span className="px-2.5 py-1 bg-navy-800/50 text-navy-300 text-xs rounded-full">Savaştepe</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-navy-400">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-navy-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-navy-300 text-sm">Hizmet Bizi Ara</p>
                  <a
                    href="tel:+905071045054"
                    className="text-navy-300 text-sm hover:text-navy-400 transition-colors duration-200"
                  >
                    0507 104 50 54
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-navy-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-navy-300 text-sm">Email</p>
                  <a
                    href="mailto:info@somaortaklaryolyardim.com"
                    className="text-navy-300 text-sm hover:text-navy-400 transition-colors duration-200"
                  >
                    info@somaortaklaryolyardim.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-navy-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-navy-400 text-sm">Adres</p>
                  <p className="text-navy-300 text-sm">
                    Turgutalp Mh. Bergama Cd. Özgür Sk. No:11/A SOMA/MANİSA
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-navy-400">Bizi Takip Edin</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg bg-navy-800 hover:bg-navy-700 transition-all duration-200 ${social.color}`}
                  title={social.name}
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          {isAuthenticated && (
            <div className="border-t border-navy-800 pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-navy-400 hover:text-red-400 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-8 pt-6 text-center">
          <p className="text-blue-400 text-xs">
            © 2024 Soma Ortaklar Yol Yardım. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
