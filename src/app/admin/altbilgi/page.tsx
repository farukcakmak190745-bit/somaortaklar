"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, ExternalLink, Trash2, Phone } from "lucide-react";
import type { FooterInfo } from "@/types";
import {
  getFooter,
  updateFooter
} from "@/lib/db-local";
import { toast } from "sonner";

type FooterData = {
  social?: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  quickLinks?: string[];
  contactInfo?: {
    phone?: string;
    phone2?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  footerText?: string;
  keywords?: string[];
};

export default function FooterPage() {
  const [footer, setFooter] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = getFooter();
      if (data) {
        setFooter(data);
      } else {
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
      console.error("Error loading footer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!footer) return;
    setSaving(true);
    try {
      const { social, quickLinks, footerText, keywords } = footer;
      await updateFooter({ social, quickLinks, footerText, keywords } as FooterInfo);
      toast.success("Footer ayarları başarıyla kaydedildi!");
    } catch (error) {
      console.error("Error saving footer:", error);
      toast.error("Kaydedilirken bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Footer Ayarları</h1>
          <p className="text-gray-600 mt-1">Site footerını yönetin</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="h-10 px-6 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {saving ? (
            <>
              <Save className="w-4 h-4 mr-2 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </>
          )}
        </Button>
      </div>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Sosyal Medya
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <Input
              type="url"
              value={footer?.social?.instagram || ""}
              onChange={(e) => {
                if (!footer) return;
                setFooter({ ...footer, social: { ...footer.social, instagram: e.target.value } });
              }}
              placeholder="https://instagram.com/"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp
            </label>
            <Input
              type="url"
              value={footer?.social?.whatsapp || ""}
              onChange={(e) => {
                if (!footer) return;
                setFooter({ ...footer, social: { ...footer.social, whatsapp: e.target.value } });
              }}
              placeholder="https://wa.me/"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook
            </label>
            <Input
              type="url"
              value={footer?.social?.facebook || ""}
              onChange={(e) => {
                if (!footer) return;
                setFooter({ ...footer, social: { ...footer.social, facebook: e.target.value } });
              }}
              placeholder="https://facebook.com/"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <Input
              type="url"
              value={footer?.social?.twitter || ""}
              onChange={(e) => {
                if (!footer) return;
                setFooter({ ...footer, social: { ...footer.social, twitter: e.target.value } });
              }}
              placeholder="https://twitter.com/"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube
            </label>
            <Input
              type="url"
              value={footer?.social?.youtube || ""}
              onChange={(e) => {
                if (!footer) return;
                setFooter({ ...footer, social: { ...footer.social, youtube: e.target.value } });
              }}
              placeholder="https://youtube.com/"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı Linkler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {footer?.quickLinks?.map((link: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={link}
                  onChange={(e) => {
                    if (!footer) return;
                    const newLinks = [...footer.quickLinks!];
                    newLinks[index] = e.target.value;
                    setFooter({ ...footer, quickLinks: newLinks });
                  }}
                  placeholder="Link metni"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (!footer) return;
                    const newLinks = footer.quickLinks?.filter((_: string, i: number) => i !== index);
                    setFooter({ ...footer, quickLinks: newLinks });
                  }}
                  className="h-10 w-10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                if (!footer) return;
                setFooter({
                  ...footer,
                  quickLinks: [...(footer.quickLinks || []), ""]
                });
              }}
              className="w-full"
            >
              Link Ekle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer Text */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Metni</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={footer?.footerText || ""}
            onChange={(e) => {
              if (!footer) return;
              setFooter({ ...footer, footerText: e.target.value });
            }}
            placeholder="Footer açıklama metni..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Anahtar Kelimeler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {footer?.keywords?.map((keyword: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    if (!footer) return;
                    const newKeywords = [...footer.keywords!];
                    newKeywords[index] = e.target.value;
                    setFooter({ ...footer, keywords: newKeywords });
                  }}
                  placeholder="Örn: Soma çekici"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (!footer) return;
                    const newKeywords = footer.keywords?.filter((_: string, i: number) => i !== index);
                    setFooter({ ...footer, keywords: newKeywords });
                  }}
                  className="h-10 w-10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                if (!footer) return;
                setFooter({
                  ...footer,
                  keywords: [...(footer.keywords || []), ""]
                });
              }}
              className="w-full"
            >
              Anahtar Kelime Ekle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            İletişim Bilgileri (Opsiyonel)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!footer?.contactInfo}
                onChange={(e) => {
                  if (!footer) return;
                  setFooter({
                    ...footer,
                    contactInfo: e.target.checked ? (footer.contactInfo || {}) : undefined
                  });
                }}
                className="w-5 h-5 rounded border-gray-300 text-navy-600 focus:ring-navy-500"
              />
              <span className="text-sm font-medium text-gray-700">
                İletişim bilgilerini göster
              </span>
            </label>
          </div>

          {footer?.contactInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <Input
                  type="text"
                  value={footer.contactInfo?.phone || ""}
                  onChange={(e) => {
                    if (!footer) return;
                    setFooter({
                      ...footer,
                      contactInfo: { ...footer.contactInfo, phone: e.target.value }
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon 2
                </label>
                <Input
                  type="text"
                  value={footer.contactInfo?.phone2 || ""}
                  onChange={(e) => {
                    if (!footer) return;
                    setFooter({
                      ...footer,
                      contactInfo: { ...footer.contactInfo, phone2: e.target.value }
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <Input
                  type="email"
                  value={footer.contactInfo?.email || ""}
                  onChange={(e) => {
                    if (!footer) return;
                    setFooter({
                      ...footer,
                      contactInfo: { ...footer.contactInfo, email: e.target.value }
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <Textarea
                  value={footer.contactInfo?.address || ""}
                  onChange={(e) => {
                    if (!footer) return;
                    setFooter({
                      ...footer,
                      contactInfo: { ...footer.contactInfo, address: e.target.value }
                    });
                  }}
                  placeholder="Adres"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çalışma Saatleri
                </label>
                <Textarea
                  value={footer.contactInfo?.hours || ""}
                  onChange={(e) =>
                    setFooter({
                      ...footer,
                      contactInfo: { ...footer.contactInfo, hours: e.target.value }
                    })
                  }
                  placeholder="Örn: Pzt - Cmt: 09:00 - 18:00"
                  rows={3}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

