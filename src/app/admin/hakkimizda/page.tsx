"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, Trash2 } from "lucide-react";
import { getAbout, updateAbout } from "@/lib/db-local";
import type { AboutSection } from "@/types";
import { toast } from "sonner";

export default function AboutPage() {
  const [about, setAbout] = useState<AboutSection>({
    title: "Hakkımızda",
    description: "",
    subtitle: "Biz Kimiz?",
    content: {
      intro: "",
      serviceArea: "",
      whyChooseUs: [""],
      closing: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = getAbout();
      setAbout({
        title: data.title || "Hakkımızda",
        description: data.description || "",
        subtitle: data.subtitle || "Biz Kimiz?",
        content: data.content || {
          intro: "",
          serviceArea: "",
          whyChooseUs: [""],
          closing: ""
        }
      });
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAbout(about);
      toast.success("Hakkımızda bilgileri güncellendi!");
    } catch (error) {
      console.error("Error saving about:", error);
      toast.error("Kaydetme hatası!");
    } finally {
      setSaving(false);
    }
  };

  const addWhyChooseUsItem = () => {
    setAbout({
      ...about,
      content: {
        ...about.content!,
        whyChooseUs: [...(about.content?.whyChooseUs || []), ""]
      }
    });
  };

  const removeWhyChooseUsItem = (index: number) => {
    const items = about.content?.whyChooseUs || [];
    setAbout({
      ...about,
      content: {
        ...about.content!,
        whyChooseUs: items.filter((_, i) => i !== index)
      }
    });
  };

  const updateWhyChooseUsItem = (index: number, value: string) => {
    const items = [...(about.content?.whyChooseUs || [])];
    items[index] = value;
    setAbout({
      ...about,
      content: {
        ...about.content!,
        whyChooseUs: items
      }
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hakkımızda</h1>
          <p className="text-gray-600 mt-1">Hakkımızda bölümünü yönetin</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="h-12 px-6 flex items-center gap-2">
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Kaydet
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Başlığı</label>
              <Input
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                placeholder="Hakkımızda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
              <Input
                value={about.subtitle || ""}
                onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
                placeholder="Biz Kimiz?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama (sayfa altı)</label>
              <Textarea
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
                rows={3}
                placeholder="Kısa açıklama..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Giriş Metni</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hakkımızda Metni</label>
              <Textarea
                value={about.content?.intro || ""}
                onChange={(e) => setAbout({ ...about, content: { ...about.content!, intro: e.target.value } })}
                rows={6}
                placeholder="Firma tanıtım metni..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hizmet Ağı</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet Bölgesi Metni</label>
              <Textarea
                value={about.content?.serviceArea || ""}
                onChange={(e) => setAbout({ ...about, content: { ...about.content!, serviceArea: e.target.value } })}
                rows={6}
                placeholder="Hizmet bölgesi açıklaması..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kapanış Metni</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kapanış Paragrafı</label>
              <Textarea
                value={about.content?.closing || ""}
                onChange={(e) => setAbout({ ...about, content: { ...about.content!, closing: e.target.value } })}
                rows={6}
                placeholder="Kapanış metni..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Neden Bizi Seçmelisiniz?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(about.content?.whyChooseUs || [""]).map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateWhyChooseUsItem(index, e.target.value)}
                  placeholder="Örn: 7/24 Soma Çekici Hizmeti: Gece gündüz, hafta sonu..."
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeWhyChooseUsItem(index)}
                  className="h-10 w-10 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addWhyChooseUsItem} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Madde Ekle
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Önizleme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gray-50 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{about.subtitle || "Biz Kimiz?"}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{about.description}</p>
            {about.content?.intro && <p className="text-gray-700 whitespace-pre-wrap">{about.content.intro}</p>}
            {about.content?.serviceArea && <p className="text-gray-700 whitespace-pre-wrap">{about.content.serviceArea}</p>}
            {about.content?.closing && <p className="text-gray-700 whitespace-pre-wrap">{about.content.closing}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
