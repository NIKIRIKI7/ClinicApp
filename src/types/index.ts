/**
 * @file index.ts
 * @description Единый источник правды для всех интерфейсов и типов данных приложения.
 */
import type {Component} from 'vue';

// --- Типы для докторов ---
export interface IDoctor {
  id: number;
  name: string;
  specialties: string[];
  photo: string;
  metro: string;
}

export interface IDoctorsFilter {
  name: string;
  specialty: string;
  metro: string;
}

export interface IDoctorsApiResponse {
  data: IDoctor[];
  totalCount: number;
}

// --- Типы для useLayoutStore (статические данные макета) ---
export interface NavItem {
  to: string;
  text: string;
}

export interface Contacts {
  phone: {
    number: string;
    href: string;
  };
  socials: {
    telegram: string;
    whatsapp: string;
  };
}

// --- Типы для асинхронно загружаемого контента ---

export interface SectionGridItemData {
  id: number;
  text: string;
  to: string;
  icon: Component;
}

export interface Promotion {
  id: number;
  image: string;
  alt: string;
  date: string;
  title: string;
  description: string;
}

export interface License {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface AdvantagesData {
  title: string;
  blob: {
    src: string;
    alt: string;
  };
  items: {
    id: number;
    title: string;
    description: string;
  }[];
}

export interface HeroData {
  titleLines: string[];
  badgeText: string;
  buttonText: string;
}

/**
 * @interface IService
 * @description Описывает структуру данных для одной услуги клиники.
 */
export interface IService {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string; // для навигации
}

/**
 * @interface IPricingItem
 * @description Описывает структуру данных для элемента в сетке цен.
 */
export interface IPricingItem {
  id: number;
  title: string;
  price: number;
  slug: string; // для ссылки
}