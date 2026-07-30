import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const oldToNew: Record<string, string> = {
  "/admin/dashboard": "/admin/panel",
  "/admin/about": "/admin/hakkimizda",
  "/admin/services": "/admin/hizmetler",
  "/admin/testimonials": "/admin/musteri-yorumlari",
  "/admin/contact": "/admin/iletisim",
  "/admin/settings": "/admin/ayarlar",
  "/admin/sliders": "/admin/sliderlar",
  "/admin/footer": "/admin/altbilgi",
  "/admin/login": "/admin/giris",
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const newPath = oldToNew[pathname];
  if (newPath) {
    const url = new URL(newPath, request.url);
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
