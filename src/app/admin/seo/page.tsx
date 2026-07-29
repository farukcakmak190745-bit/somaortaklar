"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSEO, updateSEO } from "@/lib/db-local";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
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
};

export default function SEOPage() {
  const [seo, setSeo] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('loadData called');
      const data = getSEO();
      console.log('SEO Data from getSEO():', data);
      if (data) {
        console.log('Setting SEO state:', data);
        setSeo(data);
      } else {
        console.error('SEO data is null');
        // Set default values
        setSeo({
          title: 'Soma Ortaklar Yol Yardım',
          description: 'Soma ortaklar için yol yardım hizmetleri',
          keywords: [],
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          twitterCard: 'summary'
        });
      }
    } catch (error) {
      console.error("Error loading SEO:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!seo) return;
    try {
      await updateSEO(seo);
      toast.success("SEO ayarları güncellendi!");
    } catch (error) {
      console.error("Error saving SEO:", error);
      toast.error("Kaydetme hatası!");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Ayarları</h1>
          <p className="text-gray-600 mt-1">Site SEO ayarlarını yönetin</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Ana Başlık *</label>
              <Input
                value={seo?.title || ""}
                onChange={(e) => setSeo(seo ? { ...seo, title: e.target.value } : null)}
                placeholder="Site başlığı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama *</label>
              <Textarea
                value={seo?.description || ""}
                onChange={(e) => setSeo(seo ? { ...seo, description: e.target.value } : null)}
                rows={3}
                placeholder="Site açıklaması..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelimeler</label>
              <Input
                value={seo?.keywords?.join(', ') || ""}
                onChange={(e) => setSeo(seo ? {
                  ...seo,
                  keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                } : null)}
                placeholder="anahtar keli1, anahtar keli2, ..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Open Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Open Graph (Facebook) Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
              <Input
                value={seo?.ogTitle || ""}
                onChange={(e) => {
                  if (!seo) return;
                  setSeo({ ...seo, ogTitle: e.target.value });
                }}
                placeholder="OG Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
              <Textarea
                value={seo?.ogDescription || ""}
                onChange={(e) => {
                  if (!seo) return;
                  setSeo({ ...seo, ogDescription: e.target.value });
                }}
                rows={2}
                placeholder="OG Description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
              <Input
                value={seo?.ogImage || ""}
                onChange={(e) => {
                  if (!seo) return;
                  setSeo({ ...seo, ogImage: e.target.value });
                }}
                placeholder="/images/og-image.jpg"
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
                onChange={(e) => {
                  if (!seo) return;
                  setSeo({ ...seo, twitterCard: e.target.value });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
                <option value="player">player</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
              <Input
                value={seo?.siteUrl || ""}
                onChange={(e) => {
                  if (!seo) return;
                  setSeo({ ...seo, siteUrl: e.target.value });
                }}
                placeholder="https://siteniz.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Canlı Önizleme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Meta Tag Preview:</div>
                <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                  &lt;title&gt;{seo?.title || 'Site Başlığı'}&lt;/title&gt;
                  &lt;meta name=&quot;description&quot; content=&quot;{seo?.description || 'Site açıklaması'}&quot; /&gt;
                  &lt;meta name=&quot;keywords&quot; content=&quot;{seo?.keywords?.join(', ') || ''}&quot; /&gt;
                  &lt;meta name=&quot;og:title&quot; content=&quot;{seo?.ogTitle || seo?.title || ''}&quot; /&gt;
                  &lt;meta name=&quot;og:description&quot; content=&quot;{seo?.ogDescription || seo?.description || ''}&quot; /&gt;
                  &lt;meta name=&quot;og:image&quot; content=&quot;{seo?.ogImage || ''}&quot; /&gt;
                  &lt;meta name=&quot;twitter:card&quot; content=&quot;{seo?.twitterCard || 'summary'}&quot; /&gt;
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

