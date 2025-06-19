import {createContentStore} from './factories/createContentStore';
import {fetchPromotions} from '@/api/contentApi';
import type {Promotion} from '@/types';

export const usePromotionsStore = createContentStore<Promotion[]>('promotions', fetchPromotions);