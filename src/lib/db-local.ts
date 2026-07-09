import type { DB, Service, Testimonial, AboutSection, Slider, Blog, SEOConfig, Statistics, WebsiteStatus } from '../types';

const defaultDB: DB = {
  hero: {
    title: "Soma Ortaklar Yolyardım Hizmetleri",
    subtitle: "24/7 Profesyonel Destek, Güvenilir Çözümler",
    ctaButton: "Hemen Ara",
    bgImage: "/images/hero-bg.jpg",
    featuredImage: "/images/hero-featured.jpg"
  },
  services: [
    {
      id: 1,
      title: "Oto Çekici",
      icon: "truck",
      description: "Arızalanan, kazaya karışan veya hareketsiz kalan aracınızı güvenli biçimde istediğiniz noktaya taşıyoruz.",
      price: "₺500-1000",
      area: "Şehir içi · Şehirlerarası",
      image: "/images/services/oto-cekici.jpg",
      features: ["7/24 hizmet", "Hasarsız taşıma", "Tüm Manisa ilçeleri", "Fiyat bilgisi için arayın"]
    },
    {
      id: 2,
      title: "Şehirlerarası Çekici",
      icon: "truck",
      description: "Soma ve Manisa'dan Türkiye'nin her iline güvenli araç taşımacılığı. Uzun mesafede de aynı özen, aynı hız.",
      price: "₺1500-3000",
      area: "Şehirlerarası",
      image: "/images/services/sehirlerarasi-cekici.jpg",
      features: ["7/24 hizmet", "Sigortalı taşıma", "Tüm Türkiye", "Fiyat bilgisi için arayın"]
    },
    {
      id: 3,
      title: "Kaza Çekici",
      icon: "alert-triangle",
      description: "Trafik kazası sonrası aracınızı olay yerinden en yakın servise veya istediğiniz noktaya hızla taşıyoruz.",
      price: "₺500-1000",
      area: "Şehir içi · Şehirlerarası",
      image: "/images/services/kaza-cekici.jpg",
      features: ["Acil müdahale", "7/24 hizmet", "Deneyimli ekip", "Fiyat bilgisi için arayın"]
    },
    {
      id: 4,
      title: "Akü Takviyesi",
      icon: "battery",
      description: "Aracınızın aküsü bittiğinde yerinde takviye veya değişimi yapıyoruz. Çekiciye gerek kalmadan yolunuza devam edin.",
      price: "₺200-500",
      area: "Şehir içi",
      image: "/images/services/aku-takviyesi.jpg",
      features: ["7/24 hizmet", "Yerinde işlem", "Bulunduğunuz yere geliyoruz", "Fiyat bilgisi için arayın"]
    },
    {
      id: 5,
      title: "Lastik Değişimi",
      icon: "wrench",
      description: "Yolda patlak lastikle mahsur kaldığınızda ekibimiz bulunduğunuz yere gelerek lastik değişimini yerinde yapar.",
      price: "₺150-300",
      area: "Şehir içi · Yol üzeri",
      image: "/images/services/lastik-degisimi.jpg",
      features: ["7/24 hizmet", "Yerinde işlem", "Soma ve çevre iller", "Fiyat bilgisi için arayın"]
    },
    {
      id: 6,
      title: "Yakıt İkmali",
      icon: "zap",
      description: "Yakıtınız bittiğinde ve hareket edemediğinizde bulunduğunuz yere yakıt getiriyoruz. Benzin veya motorin.",
      price: "₺100-200",
      area: "Şehir içi · Yol üzeri",
      image: "/images/services/yakit-ikmali.jpg",
      features: ["7/24 hizmet", "Benzin & motorin", "Bulunduğunuz yere geliyoruz", "Fiyat bilgisi için arayın"]
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      text: "Çok profesyonel bir ekiple çalıştım. Aracımı 15 dakikada yerinde aldırabildim. Kesinlikle tavsiye ederim!",
      rating: 5,
      initial: "AY"
    },
    {
      id: 2,
      name: "Mehmet Demir",
      text: "Gece yarısı acil durumda aradım ve gerçekten çok hızlı geldiler. Çok memnun kaldım.",
      rating: 5,
      initial: "MD"
    },
    {
      id: 3,
      name: "Ayşe Kaya",
      text: "Fiyatları makul ve hizmetleri çok profesyonel. Bir daha buralara uğrayacağım.",
      rating: 5,
      initial: "AK"
    },
    {
      id: 4,
      name: "Caner Erkin",
      text: "Trafik yardımı için çağırdım ve 5 dakika içinde geldiler. Harika bir hizmet!",
      rating: 5,
      initial: "CE"
    },
    {
      id: 5,
      name: "Elif Özkan",
      text: "En hızlı çekici hizmeti. Her zaman güvendiğim bir yer.",
      rating: 5,
      initial: "EO"
    },
    {
      id: 6,
      name: "Osman Yıldız",
      text: "Paketi profesyonelce yapıldı. Teşekkür ederim!",
      rating: 5,
      initial: "OY"
    },
    {
      id: 7,
      name: "Zeynep Demir",
      text: "Çok profesyonel ve güler yüzlü personeli beğendim. Her zaman yardımcı oluyorlar.",
      rating: 5,
      initial: "ZD"
    },
    {
      id: 8,
      name: "Murat Kaya",
      text: "Aracım patinaj yaptı, çekici geldi ve 10 dakikada yerinde aldı. Mükemmel!",
      rating: 5,
      initial: "MK"
    },
    {
      id: 9,
      name: "Ayşe Çelik",
      text: "Acil durumda her zaman yanlarında oldukları için çok teşekkür ederim. Güvenilir bir ekip.",
      rating: 5,
      initial: "AC"
    },
    {
      id: 10,
      name: "Hakan Yılmaz",
      text: "Şehir içi çok yoğun saatlerde bile hızlı geldiler. Memnun kaldım!",
      rating: 5,
      initial: "HY"
    },
    {
      id: 11,
      name: "Selin Demir",
      text: "Müşteri hizmetleri çok iyiydi. Sorularıma net cevap verdiler.",
      rating: 5,
      initial: "SD"
    },
    {
      id: 12,
      name: "Emre Özkan",
      text: "Fiyat transparent. Hiçbir ekstra ücret talep etmediler. Güvenilir!",
      rating: 5,
      initial: "EO"
    }
  ],
  contact: {
    phone: "+90 555 123 45 67",
    phone2: "+90 555 765 43 21",
    email: "info@somaortaklaryolyardim.com",
    address: "Somaras Mah. Cadde No: 123, Sakarya",
    hours: "24 Saat Hizmet Veriyoruz"
  },
  footer: {
    social: {
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/905551234567",
      facebook: "https://facebook.com"
    },
    quickLinks: [
      "Hizmetlerimiz",
      "Hakkımızda",
      "İletişim",
      "Blog",
      "Kariyer",
      "SSS"
    ]
  },
  about: {
    title: "Hakkımızda",
    description: "Soma Ortaklar Yolyardım olarak 10 yılı aşkın süredir çekici ve yolyardım hizmetleri sunuyoruz"
  },
  sliders: [
    {
      id: 1,
      title: "Profesyonel Çekici Ekibimiz",
      description: "10 yılı aşkın deneyime sahip, sertifikalı pilotlarımız hazır.",
      imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&q=80",
      order: 1,
      active: true
    },
    {
      id: 2,
      title: "Modern Çekici Araçları",
      description: "En yeni teknoloji ve güvenli taşıma araçlarımız.",
      imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1920&q=80",
      order: 2,
      active: true
    },
    {
      id: 3,
      title: "7/24 Hızlı Müdahale",
      description: "Acil durumlarda 1 dakika içinde yerinde çekici hizmeti.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
      order: 3,
      active: true
    },
    {
      id: 4,
      title: "Şehir İçi Hizmet",
      description: "Tüm Manisa ilçelerine 7/24 profesyonel taşımacılık.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
      order: 4,
      active: true
    },
    {
      id: 5,
      title: "Şehirlerarası Taşımacılık",
      description: "Türkiye'nin her iline güvenli ve hızlı taşımacılık.",
      imageUrl: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=1920&q=80",
      order: 5,
      active: true
    },
    {
      id: 6,
      title: "Uzman Pilot Ekip",
      description: "En güvenilir ve deneyimli pilotlarımızla hizmetinizdeyiz.",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
      order: 6,
      active: true
    }
  ],
  blogs: [
    {
      id: 1,
      title: "Şehirlerarası Çekici Hizmeti Nedir?",
      excerpt: "Uzak mesafelerde güvenilir çekici hizmeti hakkında tüm bilmeniz gerekenler.",
      content: "Bu blog yazısının tam içeriği...",
      category: "Hizmetler",
      tags: ["çekici", "yolyardım", "uzak mesafe"],
      author: "Admin",
      date: "2024-01-15",
      featuredImage: "/images/blog1.jpg",
      readTime: "5 dk",
      active: true
    },
    {
      id: 2,
      title: "Acil Çekici Neden Önemli?",
      excerpt: "Acil durumlarda doğru seçimi yapmak çok önemlidir.",
      content: "Bu blog yazısının tam içeriği...",
      category: "Bilgi",
      tags: ["acil", "servis", "hızlı"],
      author: "Admin",
      date: "2024-01-20",
      featuredImage: "/images/blog2.jpg",
      readTime: "3 dk",
      active: true
    }
  ],
  seo: {
    title: "Çekici & Yolyardım Hizmetleri | Soma Ortaklar",
    description: "24/7 profesyonel çekici ve yolyardım hizmetleri. Şehir içi ve şehirlerarası çekici, park çekiği, trafik yardımı.",
    keywords: ["çekici", "yolyardım", "park çekiği", "trafik yardımı", "Soma", "Sakarya"],
    ogTitle: "Çekici & Yolyardım Hizmetleri",
    ogDescription: "24/7 profesyonel çekici ve yolyardım hizmetleri. Hemen arayın!",
    ogImage: "/images/og-image.jpg",
    twitterCard: "summary_large_image"
  },
  statistics: {
    services: 5,
    clients: 1500,
    years: 10,
    satisfaction: 98,
    active: true
  },
  websiteStatus: {
    siteNumber: "SOM-12345",
    closed: false
  }
};

// Helper function to convert text to Title Case
function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// LocalStorage helpers
const STORAGE_KEY = 'somaortaklaryolyardim_db';

console.log('STORAGE_KEY:', STORAGE_KEY);

// Get all data from localStorage (client-side only)
export function getDB(): DB {
  // Only use localStorage in browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading DB:', error);
    }
  }
  return defaultDB;
}

// Save all data to localStorage
export function saveDB(db: DB): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (error) {
    console.error('Error saving DB:', error);
  }
}

// Get hero section
export function getHero(): DB['hero'] {
  const db = getDB();
  console.log('getHero called, db.hero:', db.hero);
  return db.hero || {
    title: "Soma Ortaklar Yolyardım Hizmetleri",
    subtitle: "24/7 Profesyonel Destek, Güvenilir Çözümler",
    ctaButton: "Hemen Ara",
    bgImage: "/images/hero-bg.jpg",
    featuredImage: "/images/hero-featured.jpg"
  };
}

// Update hero section
export function updateHero(data: Partial<DB['hero']>): void {
  const db = getDB();
  db.hero = { ...db.hero, ...data };
  saveDB(db);
}

// Get all services
export function getServices(): DB['services'] {
  const db = getDB();
  return (db.services || []).map(service => ({
    ...service,
    title: toTitleCase(service.title),
    description: toTitleCase(service.description)
  }));
}

// Get single service by ID
export function getService(id: number): DB['services'][0] | undefined {
  return getDB().services.find(s => s.id === id);
}

// Create new service
export function createService(service: Omit<Service, 'id'>): number {
  const db = getDB();
  const newId = Math.max(...db.services.map(s => s.id), 0) + 1;
  const newService: Service = {
    ...service,
    id: newId,
    title: toTitleCase(service.title),
    description: toTitleCase(service.description)
  };
  db.services.push(newService);
  saveDB(db);
  return newId;
}

// Update service
export function updateService(id: number, data: Partial<Service>): void {
  const db = getDB();
  const index = db.services.findIndex(s => s.id === id);
  if (index !== -1) {
    const updatedService = {
      ...db.services[index],
      ...data,
      title: data.title ? toTitleCase(data.title) : db.services[index].title,
      description: data.description ? toTitleCase(data.description) : db.services[index].description
    };
    db.services[index] = updatedService;
    saveDB(db);
  }
}

// Delete service
export function deleteService(id: number): void {
  const db = getDB();
  db.services = db.services.filter(s => s.id !== id);
  saveDB(db);
}

// Get all testimonials
export function getTestimonials(): DB['testimonials'] {
  const db = getDB();
  return db.testimonials || [];
}

// Get single testimonial by ID
export function getTestimonial(id: number): DB['testimonials'][0] | undefined {
  return getDB().testimonials.find(t => t.id === id);
}

// Create new testimonial
export function createTestimonial(testimonial: Omit<Testimonial, 'id'>): number {
  const db = getDB();
  const newId = Math.max(...db.testimonials.map(t => t.id), 0) + 1;
  const newTestimonial: Testimonial = { ...testimonial, id: newId };
  db.testimonials.push(newTestimonial);
  saveDB(db);
  return newId;
}

// Update testimonial
export function updateTestimonial(id: number, data: Partial<Testimonial>): void {
  const db = getDB();
  const index = db.testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    db.testimonials[index] = { ...db.testimonials[index], ...data };
    saveDB(db);
  }
}

// Delete testimonial
export function deleteTestimonial(id: number): void {
  const db = getDB();
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  saveDB(db);
}

// Get contact info
export function getContact(): DB['contact'] {
  const db = getDB();
  return db.contact || {
    phone: "",
    phone2: "",
    email: "",
    address: "",
    hours: ""
  };
}

// Update contact info
export function updateContact(data: Partial<DB['contact']>): void {
  const db = getDB();
  db.contact = { ...db.contact, ...data };
  saveDB(db);
}

// Get about section
export function getAbout(): DB['about'] {
  const db = getDB();
  return db.about || {
    title: "Hakkımızda",
    description: "Hakkımızda bilgisi..."
  };
}

// Update about section
export function updateAbout(data: Partial<DB['about']>): void {
  const db = getDB();
  db.about = { ...db.about, ...data };
  saveDB(db);
}

// Get footer info
export function getFooter(): DB['footer'] {
  const db = getDB();
  console.log('getFooter called, db.footer:', db.footer);
  return db.footer || {
    social: {
      instagram: "",
      whatsapp: "",
      facebook: ""
    },
    quickLinks: []
  };
}

// Update footer info
export function updateFooter(data: Partial<DB['footer']>): void {
  const db = getDB();
  db.footer = { ...db.footer, ...data };
  saveDB(db);
}

// Get all sliders
export function getSliders(): DB['sliders'] {
  const db = getDB();
  const sliders = db.sliders || [];
  return sliders.filter(s => s.active).sort((a, b) => a.order - b.order);
}

// Get single slider by ID
export function getSlider(id: number): DB['sliders'][0] | undefined {
  return getDB().sliders.find(s => s.id === id);
}

// Create new slider
export function createSlider(slider: Omit<Slider, 'id'>): number {
  const db = getDB();
  const newId = Math.max(...db.sliders.map(s => s.id), 0) + 1;
  const newSlider: Slider = { ...slider, id: newId };
  db.sliders.push(newSlider);
  saveDB(db);
  return newId;
}

// Update slider
export function updateSlider(id: number, data: Partial<Slider>): void {
  const db = getDB();
  const index = db.sliders.findIndex(s => s.id === id);
  if (index !== -1) {
    db.sliders[index] = { ...db.sliders[index], ...data };
    saveDB(db);
  }
}

// Delete slider
export function deleteSlider(id: number): void {
  const db = getDB();
  db.sliders = db.sliders.filter(s => s.id !== id);
  saveDB(db);
}

// Get SEO config
export function getSEO(): DB['seo'] {
  const db = getDB();
  console.log('getSEO called, db.seo:', db.seo);
  return db.seo || {
    title: "Soma Ortaklar Yol Yardım",
    description: "Soma ortaklar için yol yardım hizmetleri",
    keywords: [],
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary"
  };
}

// Update SEO config
export function updateSEO(data: Partial<SEOConfig>): void {
  const db = getDB();
  db.seo = { ...db.seo, ...data };
  saveDB(db);
}

// Get statistics
export function getStatistics(): Statistics {
  const db = getDB();
  return db.statistics.active ? db.statistics : { services: 0, clients: 0, years: 0, satisfaction: 0, active: false };
}

// Update statistics
export function updateStatistics(data: Partial<Statistics>): void {
  const db = getDB();
  db.statistics = { ...db.statistics, ...data };
  saveDB(db);
}

// Get website status
export function getWebsiteStatus(): WebsiteStatus {
  const db = getDB();
  return db.websiteStatus || {
    siteNumber: "",
    closed: false,
    closedReason: ""
  };
}

// Reset database to default values
export function resetDB(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDB));
  } catch (error) {
    console.error("Error resetting DB:", error);
  }
}

// Export all database functions for use in components
export { STORAGE_KEY };
