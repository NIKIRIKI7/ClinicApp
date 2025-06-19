import {createContentStore} from './factories/createContentStore';
import {fetchHeroData} from '@/api/contentApi';
import type {HeroData} from '@/types';

/**
 * @store useHeroStore
 * @description Хранилище для управления контентом главного экрана (Hero-секции).
 */
export const useHeroStore = createContentStore<HeroData>('hero', fetchHeroData);