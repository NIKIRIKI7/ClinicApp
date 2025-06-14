import { createFormStore } from './factories/createFormStore';
import doctorImage from '@/assets/images/man__promo.png';

export const useAppointmentStore = createFormStore('appointment', {
  formType: 'Appointment',
  image: {
    src: doctorImage,
    alt: 'Улыбающийся врач-стоматолог',
  },
});