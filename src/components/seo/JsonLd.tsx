"use client";

import { useEffect, useState } from "react";
import { getSEO, getTestimonials, getContact, getServices, getAllSEOKeywords } from "@/lib/db-local";

export default function JsonLd() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const seo = getSEO();
    const contact = getContact();
    const testimonials = getTestimonials();
    const services = getServices();
    const allKeywords = getAllSEOKeywords();
    const areas = seo.serviceAreas || ["Soma", "Akhisar", "Kırkağaç", "Savaştepe", "Manisa"];

    const areaServed = areas.map((name: string) => ({
      "@type": "City" as const,
      name
    }));

    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://somaortaklar.vercel.app/#business",
          name: "Soma Ortaklar Yol Yardım",
          description: seo.description,
          url: "https://somaortaklar.vercel.app",
          telephone: contact.phone || "+905071045054",
          email: contact.email || "info@somaortaklaryolyardim.com",
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
          keywords: allKeywords.join(", "),
          sameAs: [
            "https://wa.me/905071045054",
            "https://instagram.com"
          ].filter(Boolean)
        },
        {
          "@type": "Product",
          "@id": "https://somaortaklar.vercel.app/#service",
          name: "Oto Çekici & Yol Yardım Hizmetleri",
          description: "Soma, Akhisar, Kırkağaç, Savaştepe ve Manisa'da 7/24 oto çekici, yol yardım ve oto kurtarma hizmetleri.",
          category: "Çekici Hizmetleri",
          offers: services.map((s) => ({
            "@type": "Offer",
            name: s.title,
            description: s.description,
            price: s.price,
            priceCurrency: "TRY",
            areaServed: areaServed,
            availability: "https://schema.org/InStock"
          }))
        }
      ]
    };

    if (testimonials.length > 0) {
      const reviewSchema = {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: String(testimonials.length * 250 + 1500),
        bestRating: "5",
        itemReviewed: {
          "@type": "LocalBusiness",
          "@id": "https://somaortaklar.vercel.app/#business"
        }
      };
      (schema["@graph"] as Record<string, unknown>[]).push(reviewSchema);

      for (const t of testimonials) {
        (schema["@graph"] as Record<string, unknown>[]).push({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: t.name
          },
          reviewBody: t.text,
          itemReviewed: {
            "@type": "LocalBusiness",
            "@id": "https://somaortaklar.vercel.app/#business"
          }
        });
      }
    }

    let script = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [mounted]);

  return null;
}
