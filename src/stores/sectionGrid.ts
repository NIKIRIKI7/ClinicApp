import {createContentStore} from './factories/createContentStore';
import {fetchSectionGridItems} from '@/api/contentApi';
import type {SectionGridItemData} from '@/types';

export const useSectionGridStore = createContentStore<SectionGridItemData[]>('sectionGrid', fetchSectionGridItems);