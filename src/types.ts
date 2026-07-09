// Main Database Type
export type DB = {
  hero: HeroSection;
  services: Service[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  footer: FooterInfo;
  about: AboutSection;
  sliders: Slider[];
  blogs: Blog[];
  seo: SEOConfig;
  statistics: Statistics;
  websiteStatus: WebsiteStatus;
};

// Hero Section
export type HeroSection = {
  title: string;
  subtitle: string;
  ctaButton: string;
  bgImage: string;
  featuredImage?: string;
};

// Service
export type Service = {
  id: number;
  title: string;
  icon: string;
  description: string;
  price: string;
  area: string;
  image: string;
  features: string[];
};

// Testimonial
export type Testimonial = {
  id: number;
  name: string;
  text: string;
  rating: number;
  initial: string;
};


// Contact Info
export type ContactInfo = {
  phone: string;
  phone2: string;
  email: string;
  address: string;
  hours: string;
};

// Footer Info
export type FooterInfo = {
  social: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  quickLinks: string[];
  contactInfo?: ContactInfo;
  footerText?: string;
  keywords?: string[];
};

// About Section
export type AboutSection = {
  title: string;
  description: string;
  stats?: {
    years: number;
    services: number;
    clients: number;
    satisfaction: number;
  };
  image?: string;
  imageAlt?: string;
};

// Helper types for admin pages
export type AboutData = {
  title: string;
  description: string;
};

export type FooterData = {
  social: {
    instagram: string;
    whatsapp: string;
    facebook: string;
  };
  quickLinks: string[];
  contactInfo?: ContactInfo;
};

export type SEOData = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
};

// Slider
export type Slider = {
  id: number;
  title: string;
  description: string;
  ctaText?: string;
  imageUrl: string;
  order: number;
  active: boolean;
};

// Blog Post
export type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  featuredImage?: string;
  readTime: string;
  active: boolean;
};

// SEO Configuration
export type SEOConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
};

// Statistics
export type Statistics = {
  services: number;
  clients: number;
  years: number;
  satisfaction: number;
  active: boolean;
};

// Website Status
export type WebsiteStatus = {
  siteNumber?: string;
  closed?: boolean;
  closedReason?: string;
};
