import { defineStore } from 'pinia';
import type { Component } from 'vue';

// --- АССЕТЫ ---

// 1. Изображения для секции "Лицензии"
import licenseImage1 from '@/assets/images/license-1.png';
import licenseImage2 from '@/assets/images/license-2.png';
import licenseImage3 from '@/assets/images/license-3.png';
import licenseImage4 from '@/assets/images/license-4.png';

// 2. Изображения для секции "Галерея"
import galleryImage1 from '@/assets/images/gallery__item1.png';
import galleryImage2 from '@/assets/images/gallery__item2.png';
import galleryImage3 from '@/assets/images/gallery__item3.png';
import galleryImage4 from '@/assets/images/gallery__item4.png';

// 3. Изображения для секции "Наши преимущества"
import blobImage from '@/assets/images/blob.png';

// 4. Иконки для навигационной сетки (импортируются как компоненты Vue)
import IconNews from '@/assets/icons/news__icon.svg?component';
import IconTech from '@/assets/icons/tech__icon.svg?component';
import IconReviews from '@/assets/icons/reviews__icon.svg?component';
import IconGallery from '@/assets/icons/gallery__icon.svg?component';
import IconLegal from '@/assets/icons/legal__icon.svg?component';
import IconData from '@/assets/icons/processing__icon.svg?component';


// --- ИНТЕРФЕЙСЫ ТИПОВ ---

export interface NavItem {
  to: string;
  text: string;
}

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

export interface License {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface SectionGridItemData {
  id: number;
  text: string;
  to: string;
  icon: Component;
}

export interface AdvantagesData {
  title: string;
  blob: {
    src: string;
    alt: string;
  };
  items: {
    id: number;
    title: string;
    description: string;
  }[];
}

/**
 * @store content
 * @description Хранилище Pinia для управления всем статическим контентом приложения.
 */
export const useContentStore = defineStore('content', {
  state: () => ({
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
          telegram: '#',
          whatsapp: '#',
        },
      } as Contacts,
    },

    sectionGridItems: [
      { id: 1, text: 'НОВОСТИ', to: '/news', icon: IconNews },
      { id: 2, text: 'ТЕХНОЛОГИИ И ОБОРУДОВАНИЕ', to: '/technologies', icon: IconTech },
      { id: 3, text: 'ОТЗЫВЫ', to: '/reviews', icon: IconReviews },
      { id: 4, text: 'ГАЛЕРЕЯ', to: '/gallery', icon: IconGallery },
      { id: 5, text: 'ПРАВОВАЯ ИНФОРМАЦИЯ', to: '/legal', icon: IconLegal },
      { id: 6, text: 'ОБРАБОТКА ПЕРСОНАЛЬНЫХ ДАННЫХ', to: '/personal-data', icon: IconData },
    ] as SectionGridItemData[],

    licenses: [
      { id: 1, src: licenseImage1, alt: 'Лицензия 1' },
      { id: 2, src: licenseImage2, alt: 'Лицензия 2' },
      { id: 3, src: licenseImage3, alt: 'Лицензия 3' },
      { id: 4, src: licenseImage4, alt: 'Лицензия 4' },
      { id: 5, src: licenseImage4, alt: 'Лицензия 5' },
    ] as License[],

    galleryImages: [
      { id: 1, src: galleryImage1, alt: 'Интерьер клиники: стоматологическое кресло' },
      { id: 2, src: galleryImage2, alt: 'Интерьер клиники: рабочее место специалиста' },
      { id: 3, src: galleryImage3, alt: 'Интерьер клиники: процедурный кабинет' },
      { id: 4, src: galleryImage4, alt: 'Интерьер клиники: зона ожидания' },
      { id: 5, src: galleryImage1, alt: 'Интерьер клиники: вид сверху на кресло' },
    ] as GalleryImage[],

    footer: {
      copyrightBase: 'ООО «ГК РТ-Клиника» ИНН 1102334455',
      disclaimer: 'ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ.\nНЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА',
    },

    advantages: {
      title: 'Наши преимущества',
      blob: {
        src: blobImage,
        alt: 'Декоративный фоновый элемент',
      },
      items: [
        {
          id: 1,
          title: 'Команда профессионалов',
          description: 'На сегодняшний момент в нашем штате более 100 специалистов, в том числе кандидаты медицинских наук и врачи с международными сертификатами: стоматологи-терапевты, пародонтологи, хирурги-имплантологи, гнатологи, стоматологи-ортопеды и ортодонты. Отделения нашей стоматологии располагают также собственной зуботехнической лабораторией, среди сотрудников которой 10 квалифицированных зубных техников.',
        },
        {
          id: 2,
          title: 'Передовые технологии и оборудование',
          description: 'Высокотехнологичное оснащение отделений стоматологии позволяет выполнять качественную диагностику и стоматологические процедуры различного уровня сложности:<br>• компьютерные томографы Vatech и Galileos;<br>• микроскопы Leica;<br>• имплантологические системы ведущих мировых брендов;<br>• рентген-аппарат нового поколения;<br>• аппараты для профессионального отбеливания зубов ZOOM4, ZOOM3, Blanche Brillante;<br>• компьютерная анестезия;<br>• компьютерная диагностика тканей пародонта.',
        },
      ],
    } as AdvantagesData,
  }),

  getters: {
    fullCopyright(state): string {
      const currentYear = new Date().getFullYear();
      return `© ${currentYear} ${state.footer.copyrightBase}`;
    },
  },
});