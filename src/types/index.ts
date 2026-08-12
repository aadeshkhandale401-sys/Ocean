// ============================================
// Ocean MGPS — TypeScript Interfaces
// All data models for Firestore collections
// ============================================

import { Timestamp } from "firebase/firestore";

// ============================================
// Product
// ============================================
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string;
  images: string[];
  featured: boolean;
  status: "published" | "draft";
  order: number;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

// ============================================
// Project
// ============================================
export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  location: string;
  completionDate: string;
  images: string[];
  videos: string[];
  category: string;
  featured: boolean;
  status: "published" | "draft";
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt">;

// ============================================
// Service
// ============================================
export interface Service {
  id: string;
  title: string;
  category?: string;
  shortDescription: string;
  fullDescription: string;
  tagline?: string;
  badge?: string;
  leadTime?: string;
  icon: string;
  images: string[];
  features: string[];
  order: number;
  status: "published" | "draft";
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export type ServiceFormData = Omit<Service, "id" | "createdAt" | "updatedAt">;

// ============================================
// Enquiry
// ============================================
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  serviceInterest: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Timestamp | Date;
}

export type EnquiryFormData = Omit<Enquiry, "id" | "status" | "createdAt">;

// ============================================
// Site Settings
// ============================================
export interface SiteSettings {
  companyName: string;
  tagline: string;
  about: string;
  address: string;
  phones: string[];
  email: string;
  whatsapp: string;
  website: string;
  socialLinks: SocialLink[];
  heroImages: string[];
  stats: StatItem[];
  businessHours: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

// ============================================
// Media
// ============================================
export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
  size: number;
  folder: string;
  createdAt: Timestamp | Date;
}

// ============================================
// Navigation
// ============================================
export interface NavLink {
  label: string;
  href: string;
}

// ============================================
// FAQ
// ============================================
export interface FAQItem {
  question: string;
  answer: string;
}

// ============================================
// Industry
// ============================================
export interface Industry {
  icon: string;
  name: string;
  description: string;
}
