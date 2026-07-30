"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu, X,
  LayoutDashboard, Users, ClipboardList, Settings, Phone, LogOut,
  Search, Info, MousePointer, Image
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const menuItems = [
  { name: "Panel", href: "/admin/panel", icon: LayoutDashboard },
  { name: "Hizmet Yönetimi", href: "/admin/hizmetler", icon: ClipboardList },
  { name: "Slider Yönetimi", href: "/admin/sliderlar", icon: Image },
  { name: "Referans Yönetimi", href: "/admin/musteri-yorumlari", icon: Users },
  { name: "SEO Ayarları", href: "/admin/seo", icon: Search },
  { name: "Hakkımızda", href: "/admin/hakkimizda", icon: Info },
  { name: "Footer Ayarları", href: "/admin/altbilgi", icon: MousePointer },
  { name: "İletişim", href: "/admin/iletisim", icon: Phone },
  { name: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAdminAuth();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/giris";

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-gray-200 transform transition-transform duration-300 lg:static lg:inset-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b-2 border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-navy-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold">
                <span className="text-navy-900">Admin</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-navy-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-navy-50 hover:text-navy-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t-2 border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b-2 border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                {menuItems.find((item) => item.href === pathname)?.name || "Admin Panel"}
              </h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
