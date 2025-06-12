import {defineStore} from 'pinia';
import licenseImage1 from '@/assets/images/license-1.png';
import licenseImage2 from '@/assets/images/license-2.png';
import licenseImage3 from '@/assets/images/license-3.png';
import licenseImage4 from '@/assets/images/license-4.png';

export interface License {
  id: number;
  src: string;
  alt: string;
}

/**
 * @store useLicensesStore
 * @description Хранилище для данных секции "Лицензии".
 */
// УБЕДИТЕСЬ, ЧТО ЭКСПОРТ ВЫГЛЯДИТ ИМЕННО ТАК:
export const useLicensesStore = defineStore('licenses', {
  state: () => ({
    licenses: [
      {id: 1, src: licenseImage1, alt: 'Лицензия 1'},
      {id: 2, src: licenseImage2, alt: 'Лицензия 2'},
      {id: 3, src: licenseImage3, alt: 'Лицензия 3'},
      {id: 4, src: licenseImage4, alt: 'Лицензия 4'},
      {id: 5, src: licenseImage4, alt: 'Лицензия 5'},
    ] as License[],
  }),
});