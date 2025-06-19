import {createFormStore} from './factories/createFormStore';
import doctorsImage from '@/assets/images/doctor-form__item.png';

export const useCallbackStore = createFormStore('callback', {
  formType: 'Callback',
  image: {
    src: doctorsImage,
    alt: 'Два улыбающихся врача стоматологической клиники',
  },
});