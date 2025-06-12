import {defineStore} from 'pinia';
import galleryImage1 from '@/assets/images/gallery__item1.png';
import galleryImage2 from '@/assets/images/gallery__item2.png';
import galleryImage3 from '@/assets/images/gallery__item3.png';
import galleryImage4 from '@/assets/images/gallery__item4.png';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

/**
 * @store useGalleryStore
 * @description Хранилище для данных секции "Галерея".
 */
export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    galleryImages: [
      {
        id: 1,
        src: galleryImage1,
        alt: 'Интерьер клиники: стоматологическое кресло'
      },
      {
        id: 2,
        src: galleryImage2,
        alt: 'Интерьер клиники: рабочее место специалиста'
      },
      {id: 3, src: galleryImage3, alt: 'Интерьер клиники: процедурный кабинет'},
      {id: 4, src: galleryImage4, alt: 'Интерьер клиники: зона ожидания'},
      {
        id: 5,
        src: galleryImage1,
        alt: 'Интерьер клиники: вид сверху на кресло'
      },
    ] as GalleryImage[],
  }),
});