import { defineStore } from 'pinia';
import type { Component } from 'vue';

// --- АССЕТЫ ---
// Импортируем изображения для секции "Лицензии"
import licenseImage1 from '@/assets/images/license-1.png';
import licenseImage2 from '@/assets/images/license-2.png';
import licenseImage3 from '@/assets/images/license-3.png';
import licenseImage4 from '@/assets/images/license-4.png';

// Импортируем компоненты иконок для навигационной сетки.
// Предполагается, что эти файлы созданы в указанной директории.
import IconNews from '@/assets/icons/news__icon.svg?component';
import IconTech from '@/assets/icons/tech__icon.svg?component';
import IconReviews from '@/assets/icons/reviews__icon.svg?component';
import IconGallery from '@/assets/icons/gallery__icon.svg?component';
import IconLegal from '@/assets/icons/legal__icon.svg?component';
import IconData from '@/assets/icons/processing__icon.svg?component';


// --- ИНТЕРФЕЙСЫ ТИПОВ ---

/**
 * @interface NavItem
 * @description Описывает структуру элемента навигации в шапке сайта.
 * @property {string} to - Путь для vue-router.
 * @property {string} text - Отображаемый текст ссылки.
 */
export interface NavItem {
  to: string;
  text: string;
}

/**
 * @interface Contacts
 * @description Описывает структуру контактных данных.
 * @property phone - Телефонный номер и ссылка для него.
 * @property socials - Ссылки на социальные сети.
 */
export interface Contacts {
  phone: {
    number: string;
    href: string;
  };
  socials: {
    telegram: string;
    whatsapp: string;
  };
}

/**
 * @interface License
 * @description Описывает структуру лицензии.
 * @property {number} id - Уникальный идентификатор.
 * @property {string} src - Путь к изображению лицензии.
 * @property {string} alt - Альтернативный текст для изображения.
 */
export interface License {
  id: number;
  src: string;
  alt: string;
}

/**
 * @interface SectionGridItemData
 * @description Описывает структуру элемента навигационной сетки.
 * @property {number} id - Уникальный идентификатор.
 * @property {string} text - Отображаемый текст.
 * @property {string} to - Путь для vue-router.
 * @property {Component} icon - Vue-компонент иконки.
 */
export interface SectionGridItemData {
  id: number;
  text: string;
  to: string;
  icon: Component;
}

/**
 * @store content
 * @description Хранилище Pinia для управления всем статическим контентом приложения.
 */
export const useContentStore = defineStore('content', {
  state: () => ({
    /**
     * Данные для шапки сайта (header).
     */
    header: {
      navItems: [
        { to: '/about', text: 'О НАС' },
        { to: '/doctors', text: 'НАШИ ВРАЧИ' },
        { to: '/promotions', text: 'АКЦИИ' },
      ] as NavItem[],
      contacts: {
        phone: {
          number: '+7 (999) 888-77-66',
          href: 'tel:+79998887766',
        },
        socials: {
          telegram: '#', // Заменить на реальную ссылку
          whatsapp: '#', // Заменить на реальную ссылку
        },
      } as Contacts,
    },

    /**
     * Данные для элементов навигационной сетки на главной странице.
     */
    sectionGridItems: [
      { id: 1, text: 'НОВОСТИ', to: '/news', icon: IconNews },
      { id: 2, text: 'ТЕХНОЛОГИИ И ОБОРУДОВАНИЕ', to: '/technologies', icon: IconTech },
      { id: 3, text: 'ОТЗЫВЫ', to: '/reviews', icon: IconReviews },
      { id: 4, text: 'ГАЛЕРЕЯ', to: '/gallery', icon: IconGallery },
      { id: 5, text: 'ПРАВОВАЯ ИНФОРМАЦИЯ', to: '/legal', icon: IconLegal },
      { id: 6, text: 'ОБРАБОТКА ПЕРСОНАЛЬНЫХ ДАННЫХ', to: '/personal-data', icon: IconData },
    ] as SectionGridItemData[],

    /**
     * Данные для слайдера с лицензиями.
     */
    licenses: [
      { id: 1, src: licenseImage1, alt: 'Лицензия 1' },
      { id: 2, src: licenseImage2, alt: 'Лицензия 2' },
      { id: 3, src: licenseImage3, alt: 'Лицензия 3' },
      { id: 4, src: licenseImage4, alt: 'Лицензия 4' },
      { id: 5, src: licenseImage4, alt: 'Лицензия 5' }, // Пример с дубликатом для заполнения
    ] as License[],

    /**
     * Данные для подвала сайта (footer).
     */
    footer: {
      copyrightBase: 'ООО «ГК РТ-Клиника» ИНН 1102334455',
      // Используем \n для переноса. Стилизуем через white-space: pre-line в CSS.
      disclaimer: 'ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ.\nНЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА',
    },
  }),

  getters: {
    /**
     * Формирует полную строку с авторскими правами, включая текущий год.
     * @returns {string} Например: "© 2024 ООО «ГК РТ-Клиника» ИНН 1102334455"
     */
    fullCopyright(state): string {
      const currentYear = new Date().getFullYear();
      return `© ${currentYear} ${state.footer.copyrightBase}`;
    },
  },
});