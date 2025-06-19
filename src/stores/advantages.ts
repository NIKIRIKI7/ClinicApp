import {createContentStore} from './factories/createContentStore';
import {fetchAdvantages} from '@/api/contentApi';
import type {AdvantagesData} from '@/types';

export const useAdvantagesStore = createContentStore<AdvantagesData>('advantages', fetchAdvantages);