import {createContentStore} from './factories/createContentStore';
import {fetchGalleryImages} from '@/api/contentApi';
import type {GalleryImage} from '@/types';

export const useGalleryStore = createContentStore<GalleryImage[]>('gallery', fetchGalleryImages);