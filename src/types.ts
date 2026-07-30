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

export type HeroSection = {
  title: string;
  subtitle: string;
  ctaButton: string;
  bgImage: string;
  featuredImage?: string;
};

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

export type Testimonial = {
  id: number;
  name: string;
  text: string;
  rating: number;
  initial: string;
  location?: string;
  date?: string;
  image?: string;
};

export type ContactInfo = {
  phone: string;
  phone2: string;
  email: string;
  address: string;
  hours: string;
};

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

export type AboutSection = {
  title: string;
  description: string;
  subtitle?: string;
  content?: AboutContent;
};

export type AboutContent = {
  intro?: string;
  serviceArea?: string;
  whyChooseUs?: string[];
  closing?: string;
};

export type AboutData = {
  title: string;
  description: string;
  subtitle?: string;
  content?: AboutContent;
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

export type Slider = {
  id: number;
  title: string;
  description: string;
  ctaText?: string;
  imageUrl: string;
  order: number;
  active: boolean;
};

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

export type SEOConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  serviceAreas?: string[];
  baseKeywords?: string[];
  generalKeywords?: string[];
};

export type Statistics = {
  services: number;
  clients: number;
  years: number;
  satisfaction: number;
  active: boolean;
};

export type WebsiteStatus = {
  siteNumber?: string;
  closed?: boolean;
  closedReason?: string;
};
