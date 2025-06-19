import {
  mockSectionGridItems,
  mockPromotions,
  mockLicenses,
  mockGalleryImages,
  mockAdvantages,
  mockHeroData,
  servicesMock,
  mockPricingItems
} from './mockData';
import type {
  SectionGridItemData,
  Promotion,
  License,
  GalleryImage,
  AdvantagesData,
  HeroData,
  IService,
  IPricingItem,
} from '@/types';

const createApiFetcher = <T>(data: T, delay = 300): () => Promise<T> => {
  return () => new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const fetchSectionGridItems = createApiFetcher<SectionGridItemData[]>(mockSectionGridItems);
export const fetchPromotions = createApiFetcher<Promotion[]>(mockPromotions);
export const fetchLicenses = createApiFetcher<License[]>(mockLicenses);
export const fetchGalleryImages = createApiFetcher<GalleryImage[]>(mockGalleryImages);
export const fetchAdvantages = createApiFetcher<AdvantagesData>(mockAdvantages);
export const fetchHeroData = createApiFetcher<HeroData>(mockHeroData);
export const fetchServices = createApiFetcher<IService[]>(servicesMock, 250);
export const fetchPricingItems = createApiFetcher<IPricingItem[]>(mockPricingItems, 150);