import {defineStore} from 'pinia';

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

/**
 * @store useLayoutStore
 * @description Хранилище для управления глобальными элементами макета (header, footer).
 */
export const useLayoutStore = defineStore('layout', {
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
          telegram: '#',
          whatsapp: '#',
        },
      } as Contacts,
    },
    footer: {
      copyrightBase: 'ООО «ГК РТ-Клиника» ИНН 1102334455',
      disclaimer: 'ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ.\nНЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА',
    },
  }),
  getters: {
    fullCopyright(state): string {
      const currentYear = new Date().getFullYear();
      return `© ${currentYear} ${state.footer.copyrightBase}`;
    },
  },
});