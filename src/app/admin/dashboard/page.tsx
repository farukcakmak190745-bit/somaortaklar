"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Truck, CheckCircle, ArrowUpRight, Users, RefreshCw, Image as ImageIcon } from "lucide-react";
import { getDB, resetDB } from "@/lib/db-local";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalServices: 0, totalTestimonials: 0, totalSliders: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = getDB();
      setStats({
        totalServices: data.services.length,
        totalTestimonials: data.testimonials.length,
        totalSliders: data.sliders.filter((s: { active: boolean }) => s.active).length
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("İstatistikler yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadStats();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
    toast.success("İstatistikler güncellendi");
  };

  const handleReset = () => {
    if (confirm("Veritabanını sıfırlamak istediğinizden emin misiniz? Tüm veriler silinecek.")) {
      if (confirm("Bu işlem geri alınamaz. Onaylıyor musunuz?")) {
        resetDB();
        window.location.reload();
      }
    }
  };

  const statCards = [
    {
      title: "Toplam Hizmet",
      value: stats.totalServices,
      icon: Truck,
      color: "bg-navy-600",
      text: "text-navy-600",
      iconBg: "bg-navy-100",
    },
    {
      title: "Sliderlar",
      value: stats.totalSliders,
      icon: ImageIcon,
      color: "bg-blue-500",
      text: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Referanslar",
      value: stats.totalTestimonials,
      icon: Users,
      color: "bg-gold",
      text: "text-gold",
      iconBg: "bg-gold-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Hoş geldiniz! İşte sitenizin istatistikleri.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="h-10 px-4 hover:bg-red-50 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sıfırla
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-10 px-4 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {refreshing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Yenileniyor...
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Yenile
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-40 animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Yükleniyor...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">--</div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color} ${stat.text}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">Toplam sayı</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı Erişim</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/admin/services">
              <Button variant="outline" className="w-full justify-start h-12 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                <Truck className="w-5 h-5 mr-3" />
                Hizmetler
              </Button>
            </Link>
            <Link href="/admin/sliders">
              <Button variant="outline" className="w-full justify-start h-12 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                <ImageIcon className="w-5 h-5 mr-3" />
                Sliderlar
              </Button>
            </Link>
            <Link href="/admin/testimonials">
              <Button variant="outline" className="w-full justify-start h-12 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                <CheckCircle className="w-5 h-5 mr-3" />
                Referanslar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Sistem başarıyla yüklendi
                </p>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0">
                Şimdi
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-navy-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  İletişim bilgileri hazırlandı
                </p>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0">
                Şimdi
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
