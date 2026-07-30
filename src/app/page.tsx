import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://somaortaklar.vercel.app",
    name: "Soma Ortaklar Yol Yardım",
    description: "Soma çekici, oto çekici ve yol yardım hizmetleri. 7/24 profesyonel destek.",
    url: "https://somaortaklar.vercel.app",
    telephone: "+905071045054",
    email: "info@somaortaklaryolyardim.com",
    image: "https://images.unsplash.com/photo-1621922688158-5092bdb99b12?w=1200&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Turgutalp Mh. Bergama Cd. Özgür Sk. No:11/A",
      addressLocality: "Soma",
      addressRegion: "Manisa",
      postalCode: "45500",
      addressCountry: "TR"
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    },
    areaServed: [
      { "@type": "City", name: "Soma" },
      { "@type": "City", name: "Akhisar" },
      { "@type": "City", name: "Kınık" },
      { "@type": "City", name: "Kırkağaç" },
      { "@type": "City", name: "Savaştepe" },
      { "@type": "City", name: "Manisa" }
    ],
    priceRange: "₺100-₺3000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1500",
      bestRating: "5"
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}
