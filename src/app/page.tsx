import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";

const areas = [
  "Soma", "Akhisar", "Kırkağaç", "Savaştepe", "Manisa", "Kınık"
];

export default function Home() {
  const areaServed = areas.map(name => ({
    "@type": "City",
    name
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://somaortaklar.vercel.app",
    name: "Soma Ortaklar Yol Yardım",
    description: "Soma, Akhisar, Kırkağaç, Savaştepe ve Manisa'da 7/24 oto çekici, yol yardım ve oto kurtarma hizmetleri. Soma çekici, Soma oto çekici, Soma yol yardım.",
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
    areaServed,
    priceRange: "₺100-₺3000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "3000",
      bestRating: "5"
    },
    keywords: [
      "Soma çekici", "Soma oto çekici", "Soma yol yardım", "Soma oto kurtarıcı",
      "Akhisar çekici", "Akhisar oto çekici", "Akhisar yol yardım",
      "Kırkağaç çekici", "Kırkağaç oto çekici",
      "Savaştepe çekici", "Savaştepe oto çekici",
      "Manisa çekici", "Manisa oto çekici", "Manisa yol yardım",
      "oto kurtarıcı", "oto çekici", "çekici"
    ].join(", ")
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
