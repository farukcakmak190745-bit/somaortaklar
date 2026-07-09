export interface HeroSection {
  title: string;
  subtitle: string;
  ctaButton: string;
  bgImage?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  area: string;
  image: string;
  features: string[];
  gradient?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
  initial?: string;
}

export interface ContactInfo {
  phone: string;
  phone2?: string;
  email: string;
  address: string;
  hours: string;
}

export interface FooterInfo {
  social: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
  };
  quickLinks: string[];
}

export interface AboutSection {
  title: string;
  description: string;
}

export interface DB {
  hero: HeroSection;
  services: Service[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  footer: FooterInfo;
  about?: AboutSection;
}

export interface AdminAuth {
  isAuthenticated: boolean;
  username?: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  price: string;
  area: string;
  image: string;
  features: string[];
}

export interface TestimonialFormData {
  name: string;
  text: string;
  rating: number;
  image?: string;
}
