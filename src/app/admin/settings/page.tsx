"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, AlertCircle, CheckCircle } from "lucide-react";
import { getHero, updateHero, getFooter, updateFooter } from "@/lib/db-local";
import type { HeroSection } from "@/types";
import type { FooterInfo } from "@/types";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const [hero, setHero] = useState<HeroSection>({
    title: "",
    subtitle: "",
    ctaButton: "",
    bgImage: ""
  });
  const [footer, setFooter] = useState<FooterInfo>({
    social: {
      instagram: "",
      whatsapp: "",
      facebook: "",
      twitter: "",
      youtube: ""
    },
    quickLinks: [],
    contactInfo: undefined
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('loadData called');
      const heroData = getHero();
      console.log('Hero Data from getHero():', heroData);
      if (heroData) {
        console.log('Setting Hero state:', heroData);
        setHero(heroData);
      } else {
        console.error('Hero data is null');
        // Set default values
        setHero({
          title: 'Soma Ortaklar Yolyardım Hizmetleri',
          subtitle: '24/7 Profesyonel Destek, Güvenilir Çözümler',
          ctaButton: 'Hemen Ara',
          bgImage: '/images/hero-bg.jpg',
          featuredImage: '/images/hero-featured.jpg'
        });
      }
      const footerData = getFooter();
      console.log('Footer Data from getFooter():', footerData);
      if (footerData) {
        console.log('Setting Footer state:', footerData);
        setFooter(footerData);
      } else {
        console.error('Footer data is null');
        // Set default values
        setFooter({
          social: {
            instagram: '',
            whatsapp: '',
            facebook: '',
            twitter: '',
            youtube: ''
          },
          quickLinks: []
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      await updateHero(hero);
      toast.success("Ana sayfa başlığı güncellendi!");
    } catch (error) {
      console.error("Error saving hero:", error);
      toast.error("Kaydedilirken bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFooter = async () => {
    setSaving(true);
    try {
      await updateFooter(footer);
      toast.success("Footer ayarları güncellendi!");
    } catch (error) {
      console.error("Error saving footer:", error);
      toast.error("Kaydedilirken bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
        <p className="text-gray-600 mt-1">
          Site genel ayarlarını ve içerik yönetimini yapılandırın
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-navy-600" />
              Ana Sayfa (Hero) Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Başlık *
                  </label>
                  <Input
                    value={hero.title}
                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                    placeholder="Örn: Premium Çekici & Yolyardım Hizmetleri"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Başlık *
                  </label>
                  <Textarea
                    value={hero.subtitle}
                    onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                    placeholder="Örn: 24/7 Profesyonel Destek, Güvenilir Çözümler"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Butonu Metni *
                  </label>
                  <Input
                    value={hero.ctaButton}
                    onChange={(e) => setHero({ ...hero, ctaButton: e.target.value })}
                    placeholder="Örn: Hemen Ara"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arka Plan Görseli
                  </label>
                  <Input
                    value={hero.bgImage}
                    onChange={(e) => setHero({ ...hero, bgImage: e.target.value })}
                    placeholder="/images/hero-bg.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Görsel dosyasını public/images/ klasörüne koyun
                  </p>
                </div>
                <Button
                  type="submit"
                  onClick={handleSaveHero}
                  disabled={saving}
                  className="w-full h-12"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-navy-600" />
              Footer Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Link
                  </label>
                  <Input
                    value={footer.social?.instagram || ""}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        social: { ...(footer.social || {}), instagram: e.target.value }
                      })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Link
                  </label>
                  <Input
                    value={footer.social?.whatsapp || ""}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        social: { ...(footer.social || {}), whatsapp: e.target.value }
                      })
                    }
                    placeholder="https://wa.me/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Link
                  </label>
                  <Input
                    value={footer.social?.facebook || ""}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        social: { ...(footer.social || {}), facebook: e.target.value }
                      })
                    }
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hızlı Linkler (Her satıra bir link)
                  </label>
                  <Textarea
                    value={footer.quickLinks.join("\n")}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        quickLinks: e.target.value.split("\n").filter((link) => link.trim())
                      })
                    }
                    placeholder="Hizmetlerimiz\nHakkımızda\nİletişim\nBlog"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={handleSaveFooter}
                  disabled={saving}
                  className="w-full h-12"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Bilgi</h3>
              <p className="text-blue-800 mt-2">
                Tüm değişiklikleri kaydet butonuna tıklayarak güncelleyin.
                Değişiklikler hemen siteye yansır.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
