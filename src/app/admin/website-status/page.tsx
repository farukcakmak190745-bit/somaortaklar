"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Lock, Unlock } from "lucide-react";
import { getWebsiteStatus, updateWebsiteStatus } from "@/lib/db-local";
import { toast } from "sonner";

type WebsiteStatus = {
  siteNumber?: string;
  closed?: boolean;
  closedReason?: string;
};

export default function WebsiteStatusPage() {
  const [status, setStatus] = useState<WebsiteStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('loadData called');
      const data = getWebsiteStatus();
      console.log('Website Status Data from getWebsiteStatus():', data);
      if (data) {
        setStatus(data);
      } else {
        // Set default values
        setStatus({
          siteNumber: '',
          closed: false,
          closedReason: ''
        });
      }
    } catch (error) {
      console.error("Error loading website status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      if (status) {
        updateWebsiteStatus(status);
      }
      toast.success("Web sitesi durumu güncellendi!");
    } catch (error) {
      console.error("Error saving website status:", error);
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
          <h1 className="text-3xl font-bold text-gray-900">Web Sitesi Durumu</h1>
          <p className="text-gray-600 mt-1">Site sayısı ve kilit durumu</p>
        </div>
        <Button onClick={handleSave} className="h-12 px-6 flex items-center gap-2">
          <Save className="w-5 h-5" />
          Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Site Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Numarası</label>
              <Input
                value={status?.siteNumber || ""}
                onChange={(e) => {
                  if (!status) return;
                  setStatus({ ...status, siteNumber: e.target.value });
                }}
                placeholder="SOM-12345"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kilit Durumu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {status?.closed ? (
                  <Lock className="w-5 h-5 text-red-600" />
                ) : (
                  <Unlock className="w-5 h-5 text-green-600" />
                )}
                <span className="font-medium text-gray-900">
                  {status?.closed ? "Site Kilitli" : "Site Açık"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="siteClosed"
                  checked={status?.closed || false}
                  onChange={(e) => setStatus(prev => prev ? { ...prev, closed: e.target.checked } : { closed: e.target.checked })}
                  className="w-5 h-5 text-navy-600 rounded"
                />
                <label htmlFor="siteClosed" className="text-sm text-gray-700">
                  Siteyi kilitle
                </label>
              </div>
            </div>

            {status?.closed && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kilit Nedeni</label>
                <Input
                  value={status?.closedReason || ""}
                  onChange={(e) => setStatus(prev => prev ? { ...prev, closedReason: e.target.value } : { closedReason: e.target.value })}
                  placeholder="Kilit nedeni..."
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Önizleme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-6 rounded-lg ${
            status?.closed
              ? 'bg-red-50 border-2 border-red-200'
              : 'bg-green-50 border-2 border-green-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">Site Durumu</div>
                <div className={`text-2xl font-bold ${
                  status?.closed ? 'text-red-600' : 'text-green-600'
                }`}>
                  {status?.closed ? '🔒 KİLİT' : '✅ AÇIK'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-600 mb-1">Site Numarası</div>
                <div className="text-xl font-bold text-gray-900">
                  {status?.siteNumber || 'Belirtilmedi'}
                </div>
              </div>
            </div>
            {status?.closed && status?.closedReason && (
              <div className="mt-4 pt-4 border-t border-red-200">
                <div className="text-sm text-gray-600 mb-1">Kilit Nedeni:</div>
                <div className="text-red-700">{status?.closedReason}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
