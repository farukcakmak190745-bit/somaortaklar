"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Save, Copy, Phone, Info } from "lucide-react";
import { getContact, updateContact } from "@/lib/db-local";
import type { ContactInfo } from "@/types";
import { toast } from "sonner";

export default function ContactPage() {
  const router = useRouter();
  const [contact, setContact] = useState<ContactInfo>({
    phone: "",
    phone2: "",
    email: "",
    address: "",
    hours: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token !== "valid") {
      router.push("/admin/giris");
    }
  }, [router]);

  const loadContact = async () => {
    setLoading(true);
    try {
      const data = getContact();
      setContact(data);
    } catch (error) {
      console.error("Error loading contact:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopyalandı!");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContact(contact);
      toast.success("İletişim bilgileri başarıyla kaydedildi!");
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Kaydedilirken bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">İletişim Bilgileri</h1>
        <p className="text-gray-600 mt-1">Site iletişim bilgilerini düzenleyin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-navy-600" />
              Bilgileri Düzenle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmet Telefonu *
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="+90 555 123 45 67"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(contact.phone)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acil Çağrı Telefonu
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={contact.phone2 || ""}
                      onChange={(e) => setContact({ ...contact, phone2: e.target.value })}
                      placeholder="+90 555 765 43 21"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(contact.phone2 || "")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="info@example.com"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(contact.email)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres *
                  </label>
                  <Textarea
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    placeholder="Adres bilgisi..."
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Çalışma Saatleri *
                  </label>
                  <Input
                    value={contact.hours}
                    onChange={(e) => setContact({ ...contact, hours: e.target.value })}
                    placeholder="Örn: 24 Saat Hizmet Veriyoruz"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full h-12 bg-navy-600 hover:bg-navy-700 text-white"
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

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2 text-navy-600" />
              Önizleme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-navy-50 rounded-xl space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hizmet Bizi Ara:</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-lg font-semibold text-navy-900 hover:text-gold transition-colors"
                >
                  {contact.phone || "______ _____ __ __"}
                </a>
              </div>
              {contact.phone2 && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Acil Çağrı:</p>
                  <a
                    href={`tel:${contact.phone2}`}
                    className="text-lg font-semibold text-navy-900 hover:text-gold transition-colors"
                  >
                    {contact.phone2}
                  </a>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600 mb-1">Email:</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-lg font-semibold text-navy-900 hover:text-gold transition-colors"
                >
                  {contact.email || "______@______.____"}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Adres:</p>
                <p className="text-base text-navy-900">
                  {contact.address || "______ _____. _____ ____: ____"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Çalışma Saatleri:</p>
                <p className="text-base text-navy-900">
                  {contact.hours || "____ ___ ______ ________"}
                </p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <p className="font-semibold">
                  {saving ? "Kaydediliyor..." : "Bilgiler hazır"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
