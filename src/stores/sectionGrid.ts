// stores/sectionGrid.ts
import {defineStore} from 'pinia';
// ИСПРАВЛЕНИЕ 1: Импортируем markRaw и Component
import {markRaw} from 'vue';
import type {Component} from 'vue';

// Иконки для навигационной сетки
import IconNews from '@/assets/icons/news__icon.svg?component';
import IconTech from '@/assets/icons/tech__icon.svg?component';
import IconReviews from '@/assets/icons/reviews__icon.svg?component';
import IconGallery from '@/assets/icons/gallery__icon.svg?component';
import IconLegal from '@/assets/icons/legal__icon.svg?component';
import IconData from '@/assets/icons/processing__icon.svg?component';

// --- ИНТЕРФЕЙС ТИПА ---
export interface SectionGridItemData {
  id: number;
  text: string;
  to: string;
  icon: Component;
}

/**
 * @store useSectionGridStore
 * @description Хранилище для управления данными навигационной сетки секций.
 */
export const useSectionGridStore = defineStore('sectionGrid', {
  state: () => ({
    // ИСПРАВЛЕНИЕ 2: Оборачиваем каждую иконку-компонент в markRaw
    sectionGridItems: [
      {id: 1, text: 'НОВОСТИ', to: '/news', icon: markRaw(IconNews)},
      {
        id: 2,
        text: 'ТЕХНОЛОГИИ И ОБОРУДОВАНИЕ',
        to: '/technologies',
        icon: markRaw(IconTech)
      },
      {id: 3, text: 'ОТЗЫВЫ', to: '/reviews', icon: markRaw(IconReviews)},
      {id: 4, text: 'ГАЛЕРЕЯ', to: '/gallery', icon: markRaw(IconGallery)},
      {
        id: 5,
        text: 'ПРАВОВАЯ ИНФОРМАЦИЯ',
        to: '/legal',
        icon: markRaw(IconLegal)
      },
      {
        id: 6,
        text: 'ОБРАБОТКА ПЕРСОНАЛЬНЫХ ДАННЫХ',
        to: '/personal-data',
        icon: markRaw(IconData)
      },
    ] as SectionGridItemData[],
  }),
});