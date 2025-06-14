// File: src/stores/promotions.ts

import { defineStore } from 'pinia';

// Импортируем изображения. В реальном проекте URL могут приходить с API.
import promoImage1 from '@/assets/images/promo__item1.png';
import promoImage2 from '@/assets/images/promo__item2.png';
import promoImage3 from '@/assets/images/promo__item3.png';

/**
 * @interface Promotion
 * @description Описывает структуру объекта акции.
 * @property {number} id - Уникальный идентификатор.
 * @property {string} image - Путь к изображению.
 * @property {string} alt - Альтернативный текст для изображения.
 * @property {string} date - Срок действия акции.
 * @property {string} title - Заголовок акции.
 * @property {string} description - Описание акции.
 */
export interface Promotion {
  id: number;
  image: string;
  alt: string;
  date: string;
  title: string;
  description: string;
}

/**
 * @store usePromotionsStore
 * @description Хранилище для данных секции "Акции".
 */
export const usePromotionsStore = defineStore('promotions', {
  state: () => ({
    promotions: [
      {
        id: 1,
        image: promoImage1,
        alt: 'Стоматолог осматривает зубы пациента-ребенка',
        date: 'до 31 декабря 2025 года',
        title: 'Год здоровой улыбки',
        description: 'До конца года действует скидка 500 рублей на повторную процедуру гигиены полости рта.',
      },
      {
        id: 2,
        image: promoImage2,
        alt: 'Лечение зубов ребенка под наркозом',
        date: 'до 1 июня 2025 года',
        title: 'Лечение зубов во сне',
        description: 'Консультация детского стоматолога перед лечение зубов под наркозом - бесплатно!',
      },
      {
        id: 3,
        image: promoImage3,
        alt: 'Врач-стоматолог проводит осмотр пожилому мужчине',
        date: 'с 1 по 31 мая 2025 года',
        title: 'Оставайтесь с нами',
        description: 'Продолжайте обслуживание во взрослом отделении клиники.',
      },
    ] as Promotion[],
  }),
});