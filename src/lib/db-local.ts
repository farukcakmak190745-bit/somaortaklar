import type { DB, Service, Testimonial, Slider, SEOConfig, Statistics, WebsiteStatus } from '../types';

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
      name: "Mehmet Kaya",
      location: "Soma, Manisa",
      date: "1 hafta önce · Google yorumu",
      text: "Gece 01.00'de Soma'da aracım hareket edemez hale geldi. Soma Ortaklar Yol Yardım'ı aradım, 15 dakika içinde çekici kapımdaydı. Soma çekici hizmeti bu kadar hızlı olur diye beklemiyordum. Ekip hem güler yüzlü hem de çok profesyoneldi, kesinlikle tavsiye ediyorum.",
      rating: 5,
      initial: "MK"
    },
    {
      id: 2,
      name: "Zeynep Arslan",
      location: "Soma, Manisa",
      date: "3 hafta önce · Google yorumu",
      text: "Soma'da uzun süredir araç kullanıyorum, daha önce farklı firmalar denedim. Soma yol yardım konusunda Soma Ortaklar ile karşılaştırılacak başka bir firma görmedim. Aküm bittiğinde aradım, gelip yerinde hallettiler. Fiyatı da dürüst, sürpriz çıkmıyor.",
      rating: 5,
      initial: "ZA"
    },
    {
      id: 3,
      name: "Serkan Çelik",
      location: "Akhisar, Manisa",
      date: "2 hafta önce · Google yorumu",
      text: "Akhisar'da kaza yaptım, çok stresliydim ne yapacağımı bilemedim. Akhisar oto çekici diye aratınca Soma Ortaklar Yol Yardım çıktı. Aradım, sakin ve net konuştular, kısa sürede geldiler. Aracımı hasarsız servise teslim ettiler. Akhisar ve çevresinde bu işi en iyi onlar yapıyor.",
      rating: 5,
      initial: "SC"
    },
    {
      id: 4,
      name: "Hüseyin Baş",
      location: "Kınık, İzmir",
      date: "1 ay önce · Google yorumu",
      text: "Kınık'tan Soma'ya geçerken lastiğim patladı, yolun ortasında mahsur kaldım. Kınık yol yardım diye aradım, Soma Ortaklar'a bağlandım. Düşündüğümden çok daha kısa sürede geldiler. Lastik değişimini hızlıca yaptılar, yoluma devam edebildim. Kınık ve çevresi için güvenle öneririm.",
      rating: 5,
      initial: "HB"
    },
    {
      id: 5,
      name: "Fatih Yıldız",
      location: "Savaştepe, Balıkesir",
      date: "1 ay önce · Google yorumu",
      text: "Savaştepe'de gece aracım yolda kaldı, çevrede çekici bulamadım. Soma yol yardım diye aradım, Soma Ortaklar hemen yola çıktı. Savaştepe gibi şehir merkezinden uzak bir noktaya bu kadar hızlı gelmelerini beklemiyordum. Gerçekten güvenilir bir ekip, tekrar ihtiyacım olsa yine ararım.",
      rating: 5,
      initial: "FY"
    },
    {
      id: 6,
      name: "Nurcan Özer",
      location: "Kırkağaç, Manisa",
      date: "2 ay önce · Google yorumu",
      text: "Kırkağaç'ta yakıtım bitti, ne yapacağımı bilemedim. Kırkağaç yol yardım diye internette arama yaptım, Soma Ortaklar Yol Yardım'a ulaştım. Soma'dan Kırkağaç'a kadar geldiler, yakıt ikmali yaptılar. Kırkağaç çekici ve yol yardım için bu firmayı rahatlıkla önerebilirim.",
      rating: 5,
      initial: "NO"
    }
  ],
  contact: {
    phone: "0507 104 50 54",
    phone2: "0507 104 50 54",
    email: "info@somaortaklaryolyardim.com",
    address: "Turgutalp Mh. Bergama Cd. Özgür Sk. No:11/A SOMA/MANİSA",
    hours: "24 Saat Hizmet Veriyoruz"
  },
  footer: {
    social: {
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/905071045054",
      facebook: "https://facebook.com"
    },
    quickLinks: [
      "Hizmetlerimiz",
      "Hakkımızda",
      "İletişim",
      "Blog",
      "Kariyer",
      "SSS"
    ],
    footerText: "Soma oto çekici ve Soma yol yardım hizmetlerinde bölgenin güvenilir adresi. Manisa Soma merkezli çekici firmamız; Soma çekici, Akhisar çekici, Kınık çekici, Kırkağaç çekici ve Savaştepe çekici hizmetleriyle 7/24 yolunuzda. Aracınız arızalandığında, kaza yaptığınızda veya yolda kaldığınızda Soma oto çekici hattımız tek aramada yanınızda. Oto çekici, oto kurtarma, araç kurtarma, yol yardım, akü takviyesi ve lastik değişimi hizmetleri için Soma Ortaklar Yol Yardım'ı arayın.",
    keywords: ["Soma çekici", "Soma oto çekici", "Soma yol yardım", "Manisa çekici"]
  },
  about: {
    title: "Hakkımızda",
    description: "Soma'nın en güvenilir oto çekici ve yol yardım firmasıyız",
    subtitle: "Biz Kimiz?",
    content: {
      intro: "Soma Ortaklar Yol Yardım olarak, Manisa'nın Soma ilçesinde kurulu profesyonel oto çekici ve yol yardım firmasıyız. Soma çekici, Soma oto çekici ve Soma yol yardım hizmetlerinde bölgenin en güvenilir ismi olarak yıllardır araç sahiplerinin yanında oluyoruz. En zor anlarda, en hızlı çözümü sunmak için 7 gün 24 saat yoldayız.",
      serviceArea: "Soma merkezli çekici hizmetimizle Manisa'nın tüm ilçelerini kapsayan geniş bir hizmet ağına sahibiz. Soma, Ahmetli, Akhisar, Alaşehir, Demirci, Gölmarmara, Gördes, Kınık, Kırkağaç, Köprübaşı, Salihli, Sarıgöl, Saruhanlı, Şehzadeler, Turgutlu, Yunusemre ve Savaştepe genelinde profesyonel çekici ekiplerimiz her an hizmete hazır beklemektedir.",
      whyChooseUs: [
        "7/24 Soma Çekici Hizmeti: Gece gündüz, hafta sonu ve resmi tatillerde ekibimiz her an yolda.",
        "Geniş Hizmet Ağı: Soma ve Manisa ilçelerinin tamamına ortalama 20–30 dakika içinde ulaşım.",
        "Profesyonel Çekici Ekibi: Lisanslı, deneyimli ve alanında uzman oto çekici operatörleri.",
        "Şeffaf Fiyatlandırma: Gizli ücret yok; anlaşılan fiyat, ödenen fiyattır.",
        "Modern Çekici Araç Filosu: Her türlü kara taşıtına uygun, son teknoloji çekici araçlar.",
        "Hasarsız Taşıma Garantisi: Aracınız bize teslim edildiği gibi teslim edilir."
      ],
      closing: "Soma çekici, Soma oto çekici, araç kurtarma, lastik değişimi, akü takviyesi veya yol yardım hizmetlerine ihtiyaç duyduğunuz her an Soma Ortaklar Yol Yardım olarak hemen yanınızdayız. Soma ve Manisa genelinde oto çekici denildiğinde akla gelen ilk isim olmaktan gurur duyuyoruz."
    }
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
    title: "Çekici & Yol Yardım | Soma - Akhisar - Kırkağaç - Savaştepe - Manisa | Soma Ortaklar",
    description: "Soma, Akhisar, Kırkağaç, Savaştepe, Manisa'da 7/24 oto çekici, yol yardım ve oto kurtarma hizmeti. Soma çekici, Soma oto çekici ve Soma yol yardım için hemen arayın.",
    keywords: [
      "Soma çekici", "Soma oto çekici", "Soma yol yardım", "Soma oto kurtarıcı",
      "Akhisar çekici", "Akhisar oto çekici", "Akhisar yol yardım",
      "Kırkağaç çekici", "Kırkağaç oto çekici",
      "Savaştepe çekici", "Savaştepe oto çekici",
      "Manisa çekici", "Manisa oto çekici", "Manisa yol yardım",
      "oto kurtarıcı", "oto çekici", "çekici"
    ],
    ogTitle: "Çekici & Yol Yardım | Soma, Akhisar, Kırkağaç, Savaştepe, Manisa",
    ogDescription: "Soma, Akhisar, Kırkağaç, Savaştepe ve Manisa'da 7/24 profesyonel oto çekici ve yol yardım hizmeti. Hemen arayın!",
    ogImage: "https://images.unsplash.com/photo-1621922688158-5092bdb99b12?w=1200&q=80",
    twitterCard: "summary_large_image",
    serviceAreas: ["Soma", "Akhisar", "Kırkağaç", "Savaştepe", "Manisa", "Kınık"],
    baseKeywords: ["Çekici", "Oto Çekici", "Yol Yardım", "Oto Kurtarıcı"],
    generalKeywords: ["Oto Kurtarıcı", "Oto Çekici", "Çekici", "Araç Kurtarma", "Yol Yardım"]
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
  const newId = db.services.reduce((max, s) => Math.max(max, s.id), 0) + 1;
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
  const newId = db.testimonials.reduce((max, t) => Math.max(max, t.id), 0) + 1;
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
    description: "Soma'nın en güvenilir oto çekici ve yol yardım firmasıyız",
    subtitle: "Biz Kimiz?"
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
  return db.footer || {
    social: {
      instagram: "",
      whatsapp: "",
      facebook: ""
    },
    quickLinks: [],
    footerText: "",
    keywords: []
  };
}

// Update footer info
export function updateFooter(data: Partial<DB['footer']>): void {
  const db = getDB();
  db.footer = { ...db.footer, ...data };
  saveDB(db);
}

// Get all sliders (active only, for frontend)
export function getSliders(): DB['sliders'] {
  const db = getDB();
  const sliders = db.sliders || [];
  return sliders.filter(s => s.active).sort((a, b) => a.order - b.order);
}

// Get all sliders including inactive ones (for admin panel)
export function getAllSliders(): DB['sliders'] {
  const db = getDB();
  const sliders = db.sliders || [];
  return sliders.sort((a, b) => a.order - b.order);
}

// Get single slider by ID
export function getSlider(id: number): DB['sliders'][0] | undefined {
  return getDB().sliders.find(s => s.id === id);
}

// Create new slider
export function createSlider(slider: Omit<Slider, 'id'>): number {
  const db = getDB();
  const newId = db.sliders.reduce((max, s) => Math.max(max, s.id), 0) + 1;
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

// Update website status
export function updateWebsiteStatus(data: Partial<WebsiteStatus>): void {
  const db = getDB();
  db.websiteStatus = { ...db.websiteStatus, ...data };
  saveDB(db);
}

// Reset database to default values
export function resetDB(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDB));
  } catch (error) {
    console.error("Error resetting DB:", error);
  }
}

// Generate all SEO keywords from service areas + base keywords
export function getAllSEOKeywords(): string[] {
  const seo = getSEO();
  const areas = seo.serviceAreas || ["Soma", "Akhisar", "Kırkağaç", "Savaştepe", "Manisa"];
  const base = seo.baseKeywords || ["Çekici", "Oto Çekici", "Yol Yardım", "Oto Kurtarıcı"];
  const general = seo.generalKeywords || ["Oto Kurtarıcı", "Oto Çekici", "Çekici", "Araç Kurtarma"];
  const manual = seo.keywords || [];

  const generated: string[] = [];
  for (const area of areas) {
    for (const kw of base) {
      generated.push(`${area} ${kw}`);
    }
  }
  return [...new Set([...generated, ...general, ...manual])];
}

// Export all database functions for use in components
export { STORAGE_KEY };
