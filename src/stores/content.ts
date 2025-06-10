import {defineStore} from 'pinia'

// Импортируем ассеты прямо в стор, так как данные теперь живут здесь
import licenseImage1 from '@/assets/images/license-1.png'
import licenseImage2 from '@/assets/images/license-2.png'
import licenseImage3 from '@/assets/images/license-3.png'
import licenseImage4 from '@/assets/images/license-4.png'

// Определяем интерфейсы для строгости типов
export interface NavItem {
  to: string
  text: string
}

export interface Contacts {
  phone: {
    number: string
    href: string
  }
  socials: {
    telegram: string
    whatsapp: string
  }
}

export interface License {
  id: number
  src: string
  alt: string
}

// Создаем стор 'content'
export const useContentStore = defineStore('content', {
  state: () => ({
    header: {
      navItems: [
        {to: '/about', text: 'О НАС'},
        {to: '/doctors', text: 'НАШИ ВРАЧИ'},
        {to: '/promotions', text: 'АКЦИИ'},
      ] as NavItem[],
      contacts: {
        phone: {
          number: '+7 (999) 888-77-66',
          href: 'tel:+79998887766',
        },
        socials: {
          telegram: '#', // Placeholder URL
          whatsapp: '#', // Placeholder URL
        },
      } as Contacts,
    },
    licenses: [
      {id: 1, src: licenseImage1, alt: 'Лицензия 1'},
      {id: 2, src: licenseImage2, alt: 'Лицензия 2'},
      {id: 3, src: licenseImage3, alt: 'Лицензия 3'},
      {id: 4, src: licenseImage4, alt: 'Лицензия 4'},
      {id: 5, src: licenseImage4, alt: 'Лицензия 5'}, // Пример с дубликатом, чтобы было больше элементов
    ] as License[],
    footer: {
      copyrightBase: 'ООО «ГК РТ-Клиника» ИНН 1102334455',
      // Используем \n вместо <br> для безопасности и стилизуем через CSS
      disclaimer: 'ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ.\nНЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА',
    },
  }),

  getters: {
    /**
     * Создает строку с авторскими правами, используя текущий год.
     * @returns {string} Например: "© 2024 ООО «ГК РТ-Клиника»..."
     */
    fullCopyright(state): string {
      const currentYear = new Date().getFullYear();
      return `© ${currentYear} ${state.footer.copyrightBase}`;
    },
  },
});