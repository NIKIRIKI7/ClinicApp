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

/**
 * @description Создает функцию-обертку для имитации запроса к API.
 * @param data - Моковые данные, которые должны быть возвращены.
 * @returns Функция, возвращающая Promise с данными.
 */
const createApiFetcher = <T>(data: T): () => Promise<T> => {
  return () => Promise.resolve(data);
};

export const fetchSectionGridItems = createApiFetcher<SectionGridItemData[]>(mockSectionGridItems);
export const fetchPromotions = createApiFetcher<Promotion[]>(mockPromotions);
export const fetchLicenses = createApiFetcher<License[]>(mockLicenses);
export const fetchGalleryImages = createApiFetcher<GalleryImage[]>(mockGalleryImages);
export const fetchAdvantages = createApiFetcher<AdvantagesData>(mockAdvantages);
export const fetchHeroData = createApiFetcher<HeroData>(mockHeroData);

export const fetchServices = createApiFetcher<IService[]>(servicesMock);
export const fetchPricingItems = createApiFetcher<IPricingItem[]>(mockPricingItems);