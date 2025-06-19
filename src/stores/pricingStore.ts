import { createContentStore } from './factories/createContentStore';
import { fetchPricingItems } from '@/api/contentApi';
import type { IPricingItem } from '@/types';

/**
 * @store usePricingStore
 * @description Хранилище для управления списком услуг и их стоимостью.
 */
export const usePricingStore = createContentStore<IPricingItem[]>('pricing', fetchPricingItems);