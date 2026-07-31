import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: "/admin/login", destination: "/admin/giris", permanent: true },
      { source: "/admin/dashboard", destination: "/admin/panel", permanent: true },
      { source: "/admin/about", destination: "/admin/hakkimizda", permanent: true },
      { source: "/admin/services", destination: "/admin/hizmetler", permanent: true },
      { source: "/admin/testimonials", destination: "/admin/musteri-yorumlari", permanent: true },
      { source: "/admin/contact", destination: "/admin/iletisim", permanent: true },
      { source: "/admin/settings", destination: "/admin/ayarlar", permanent: true },
      { source: "/admin/sliders", destination: "/admin/sliderlar", permanent: true },
      { source: "/admin/footer", destination: "/admin/altbilgi", permanent: true },
    ];
  },
};

export default nextConfig;
