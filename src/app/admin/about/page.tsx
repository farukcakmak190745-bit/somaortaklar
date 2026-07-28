"use client";

import { useState, useEffect } from "react";

type AboutData = {
  title?: string;
  description?: string;
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { getAbout, updateAbout } from "@/lib/db-local";
import { toast } from "sonner";

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = getAbout();
      if (data) {
        setAbout(data);
      } else {
        setAbout({
          title: 'Hakkımızda',
          description: 'Hakkımızda bilgisi...'
        });
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);


  const handleSave = async () => {
    if (!about) return;
    try {
      await updateAbout(about);
      toast.success("Hakkımızda bilgileri güncellendi!");
    } catch (error) {
      console.error("Error saving about:", error);
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
          <h1 className="text-3xl font-bold text-gray-900">Hakkımızda</h1>
          <p className="text-gray-600 mt-1">Hakkımızda bölümünü yönetin</p>
        </div>
        <Button onClick={handleSave} className="h-12 px-6 flex items-center gap-2">
          <Save className="w-5 h-5" />
          Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hakkımızda Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
              <Input
                value={about?.title || ""}
                onChange={(e) => setAbout(about ? { ...about, title: e.target.value } : null)}
                placeholder="Hakkımızda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <Textarea
                value={about?.description || ""}
                onChange={(e) => setAbout(about ? { ...about, description: e.target.value } : null)}
                rows={5}
                placeholder="Hakkımızda açıklaması..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Önizleme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{about?.title || "Hakkımızda"}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{about?.description || "Açıklama bulunmuyor..."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
