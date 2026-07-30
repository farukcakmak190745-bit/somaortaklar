"use client";

import { useEffect } from "react";
import { getSEO } from "@/lib/db-local";

export default function SEOHead() {
  useEffect(() => {
    const seo = getSEO();

    document.title = seo.title || "Çekici & Yol Yardım | Soma Ortaklar";

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", seo.description);
    setMeta("keywords", (seo.keywords || []).join(", "));
    setMeta("og:title", seo.ogTitle || seo.title, true);
    setMeta("og:description", seo.ogDescription || seo.description, true);
    setMeta("og:image", seo.ogImage || "https://images.unsplash.com/photo-1621922688158-5092bdb99b12?w=1200&q=80", true);
    setMeta("og:url", "https://somaortaklar.vercel.app", true);
    setMeta("og:type", "website", true);
    setMeta("og:locale", "tr_TR", true);
    setMeta("twitter:card", seo.twitterCard || "summary_large_image");
    setMeta("twitter:title", seo.ogTitle || seo.title);
    setMeta("twitter:description", seo.ogDescription || seo.description);
    setMeta("twitter:image", seo.ogImage || "");
  }, []);

  return null;
}
