import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { sendFormRequest, type IFormData, type IApiFieldError } from '@/api/formApi';
import { useNotifier } from '@/composables/useNotifier';

export const FORM_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type FormStatus = typeof FORM_STATUS[keyof typeof FORM_STATUS];

export interface FormStoreConfig {
  formType: string;
  image?: { src: string; alt: string };
}

export const createFormStore = (id: string, config: FormStoreConfig) => {
  return defineStore(id, () => {
    const notifier = useNotifier();

    const name = ref('');
    const phone = ref('');
    const status = ref<FormStatus>(FORM_STATUS.IDLE);
    const image = ref(config.image);
    const fieldErrors = reactive<Partial<Record<keyof IFormData, string>>>({});
    const liveAnnouncerText = ref('');

    const clearErrors = () => {
      fieldErrors.name = undefined;
      fieldErrors.phone = undefined;
    };

    const resetForm = () => {
      name.value = '';
      phone.value = '';
      status.value = FORM_STATUS.IDLE;
      clearErrors();
    };

    const submitForm = async () => {
      if (status.value === FORM_STATUS.LOADING) return;

      status.value = FORM_STATUS.LOADING;
      liveAnnouncerText.value = 'Отправка формы...';
      clearErrors();

      try {
        const formData: IFormData = { name: name.value, phone: phone.value };
        const response = await sendFormRequest(formData, config.formType);

        status.value = FORM_STATUS.SUCCESS;
        notifier.showSuccess(response.message);
        liveAnnouncerText.value = response.message;
        setTimeout(resetForm, 2000);

      } catch (e) {
        status.value = FORM_STATUS.ERROR;

        if (Array.isArray(e) && e[0].field) {
          (e as IApiFieldError[]).forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          const firstErrorMessage = e[0].message;
          liveAnnouncerText.value = `Ошибка валидации: ${firstErrorMessage}`;
        } else {
          const errorMessage = e instanceof Error ? e.message : 'Произошла неизвестная ошибка.';
          notifier.showError(errorMessage);
          liveAnnouncerText.value = `Ошибка: ${errorMessage}`;
        }

        setTimeout(() => {
          if (status.value === FORM_STATUS.ERROR) {
            status.value = FORM_STATUS.IDLE;
          }
        }, 2000);
      }
    };

    return { name, phone, status, image, fieldErrors, liveAnnouncerText, submitForm };
  });
};