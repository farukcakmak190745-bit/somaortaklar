"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSEO, updateSEO, getAllSEOKeywords } from "@/lib/db-local";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, X, MapPin, Hash, Globe } from "lucide-react";
import { toast } from "sonner";

type SEOData = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  siteUrl?: string;
  serviceAreas?: string[];
  baseKeywords?: string[];
  generalKeywords?: string[];
};

export default function SEOPage() {
  const [seo, setSeo] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatedAll, setGeneratedAll] = useState<string[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = getSEO();
      if (data) {
        setSeo(data);
        setGeneratedAll(getAllSEOKeywords());
      } else {
        setSeo({
          title: "Çekici & Yol Yardım | Soma - Akhisar - Kırkağaç - Savaştepe - Manisa | Soma Ortaklar",
          description: "Soma, Akhisar, Kırkağaç, Savaştepe ve Manisa'da 7/24 oto çekici, yol yardım ve oto kurtarma hizmeti.",
          keywords: [],
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
          twitterCard: "summary_large_image",
          serviceAreas: ["Soma", "Akhisar", "Kırkağaç", "Savaştepe", "Manisa"],
          baseKeywords: ["Çekici", "Oto Çekici", "Yol Yardım", "Oto Kurtarıcı"],
          generalKeywords: ["Oto Kurtarıcı", "Oto Çekici", "Çekici", "Araç Kurtarma", "Yol Yardım"]
        });
      }
    } catch (err) {
      console.error("Error loading SEO:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (seo) {
      setGeneratedAll(getAllSEOKeywords());
    }
  }, [seo]);

  const handleSave = async () => {
    if (!seo) return;
    try {
      await updateSEO(seo);
      toast.success("SEO ayarları güncellendi!");
    } catch (err) {
      console.error("Error saving SEO:", err);
      toast.error("Kaydetme hatası!");
    }
  };

  const addItem = (field: "serviceAreas" | "baseKeywords" | "generalKeywords") => {
    if (!seo) return;
    const list = seo[field] || [];
    setSeo({ ...seo, [field]: [...list, ""] });
  };

  const removeItem = (field: "serviceAreas" | "baseKeywords" | "generalKeywords", index: number) => {
    if (!seo) return;
    const list = seo[field] || [];
    setSeo({ ...seo, [field]: list.filter((_, i) => i !== index) });
  };

  const updateItem = (field: "serviceAreas" | "baseKeywords" | "generalKeywords", index: number, value: string) => {
    if (!seo) return;
    const list = seo[field] || [];
    list[index] = value;
    setSeo({ ...seo, [field]: [...list] });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Ayarları</h1>
          <p className="text-gray-600 mt-1">Site SEO ayarlarını yönetin - Google&apos;da üst sıralar için optimize edin</p>
        </div>
        <Button onClick={handleSave} className="h-12 px-6 flex items-center gap-2">
          <Save className="w-5 h-5" />
          Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main SEO */}
        <Card>
          <CardHeader>
            <CardTitle>Ana SEO Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sayfa Başlığı (Title) *</label>
              <Input
                value={seo?.title || ""}
                onChange={(e) => setSeo(seo ? { ...seo, title: e.target.value } : null)}
                placeholder="Site başlığı - max 60 karakter"
              />
              <p className="text-xs text-gray-500 mt-1">{(seo?.title || "").length}/60 karakter</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Açıklama (Description) *</label>
              <Textarea
                value={seo?.description || ""}
                onChange={(e) => setSeo(seo ? { ...seo, description: e.target.value } : null)}
                rows={3}
                placeholder="Site açıklaması - max 160 karakter"
              />
              <p className="text-xs text-gray-500 mt-1">{(seo?.description || "").length}/160 karakter</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Manuel Anahtar Kelimeler</label>
              <Input
                value={seo?.keywords?.join(", ") || ""}
                onChange={(e) => setSeo(seo ? {
                  ...seo,
                  keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean)
                } : null)}
                placeholder="kelime1, kelime2, ..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Buraya ekstra anahtar kelimeler ekleyin. Lokasyon+Kelime kombinasyonları otomatik üretilir.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-navy-600" />
              Hizmet Bölgeleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Her bölge, tüm anahtar kelimelerle birleştirilir. Örn: Soma + Çekici = &quot;Soma Çekici&quot;
            </p>
            {(seo?.serviceAreas || []).map((area, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={area}
                  onChange={(e) => updateItem("serviceAreas", i, e.target.value)}
                  placeholder="Örn: Soma"
                  className="flex-1"
                />
                <button
                  onClick={() => removeItem("serviceAreas", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <Button variant="outline" onClick={() => addItem("serviceAreas")} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Bölge Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Base Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-navy-600" />
              Baz Anahtar Kelimeler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Her kelime tüm bölgelerle birleştirilir. Örn: Soma + <strong>Çekici</strong>, Soma + <strong>Oto Çekici</strong>
            </p>
            {(seo?.baseKeywords || []).map((kw, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={kw}
                  onChange={(e) => updateItem("baseKeywords", i, e.target.value)}
                  placeholder="Örn: Çekici"
                  className="flex-1"
                />
                <button
                  onClick={() => removeItem("baseKeywords", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <Button variant="outline" onClick={() => addItem("baseKeywords")} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Anahtar Kelime Ekle
            </Button>
          </CardContent>
        </Card>

        {/* General Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-navy-600" />
              Genel Anahtar Kelimeler (Lokasyonsuz)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Bunlar tüm bölgelerde geçerli genel kelimelerdir.
            </p>
            {(seo?.generalKeywords || []).map((kw, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={kw}
                  onChange={(e) => updateItem("generalKeywords", i, e.target.value)}
                  placeholder="Örn: Oto Kurtarıcı"
                  className="flex-1"
                />
                <button
                  onClick={() => removeItem("generalKeywords", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <Button variant="outline" onClick={() => addItem("generalKeywords")} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Genel Kelime Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Open Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Open Graph (Sosyal Medya) Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
              <Input
                value={seo?.ogTitle || ""}
                onChange={(e) => setSeo(seo ? { ...seo, ogTitle: e.target.value } : null)}
                placeholder="OG Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
              <Textarea
                value={seo?.ogDescription || ""}
                onChange={(e) => setSeo(seo ? { ...seo, ogDescription: e.target.value } : null)}
                rows={2}
                placeholder="OG Description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
              <Input
                value={seo?.ogImage || ""}
                onChange={(e) => setSeo(seo ? { ...seo, ogImage: e.target.value } : null)}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Twitter Card */}
        <Card>
          <CardHeader>
            <CardTitle>Twitter Card Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
              <select
                value={seo?.twitterCard || "summary"}
                onChange={(e) => setSeo(seo ? { ...seo, twitterCard: e.target.value } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
              <Input
                value={seo?.siteUrl || ""}
                onChange={(e) => setSeo(seo ? { ...seo, siteUrl: e.target.value } : null)}
                placeholder="https://somaortaklar.vercel.app"
              />
            </div>
          </CardContent>
        </Card>

        {/* Generated Keywords Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-green-600" />
              Otomatik Üretilen Tüm Anahtar Kelimeler ({generatedAll.length} adet)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {generatedAll.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Bu kelimeler otomatik olarak Schema.org yapısal verisine ve meta keywords etiketine eklenir.
              Her bölge + baz kelime kombinasyonu ayrı bir anahtar kelime olarak üretilir.
            </p>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Google Arama Önizlemesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <div className="max-w-2xl">
                <div className="text-sm text-green-700 mb-1">https://somaortaklar.vercel.app</div>
                <div className="text-xl text-blue-700 font-semibold mb-1 hover:underline cursor-pointer">
                  {seo?.title || "Site Başlığı"}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {seo?.description || "Site açıklaması"}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {generatedAll.slice(0, 10).map((kw, i) => (
                    <span key={i} className="text-xs text-gray-500">
                      {kw}{i < Math.min(generatedAll.length, 10) - 1 ? " ·" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
