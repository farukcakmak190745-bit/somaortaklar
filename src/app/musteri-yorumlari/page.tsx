import Testimonials from "@/components/sections/Testimonials";

export default function MusteriYorumlariPage() {
  return (
    <main className="min-h-screen">
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Müşteri Yorumları</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Soma, Akhisar, Kırkağaç, Savaştepe ve Manisa&apos;da binlerce mutlu müşterimizin görüşleri
          </p>
        </div>
      </div>
      <Testimonials />
    </main>
  );
}
