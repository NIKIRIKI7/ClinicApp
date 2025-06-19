import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import CallbackForm from '../../../src/components/sections/CallbackForm.vue';
import {useCallbackStore} from '../../../src/stores/useCallbackStore';
import {FORM_STATUS} from '../../../src/stores/factories/createFormStore';

describe('CallbackForm.vue', () => {
  // ИСПРАВЛЕНИЕ: Создаем экземпляр Pinia, который будет использоваться во всех тестах этого блока
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('отправляет форму при сабмите', async () => {
    const store = useCallbackStore();
    // Spy на экшен стора
    const submitSpy = vi.spyOn(store, 'submitForm');

    const wrapper = mount(CallbackForm, {
      global: {
        // ИСПРАВЛЕНИЕ: Передаем созданный экземпляр Pinia компоненту
        plugins: [pinia],
      },
    });

    await wrapper.find('#callback-name').setValue('Test Name');
    await wrapper.find('#callback-phone').setValue('123456789');
    await wrapper.find('form').trigger('submit.prevent');

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('отображает ошибки валидации из стора', async () => {
    const store = useCallbackStore();

    const wrapper = mount(CallbackForm, {
      global: {
        plugins: [pinia], // ИСПРАВЛЕНИЕ: Передаем созданный экземпляр Pinia компоненту
      },
    });

    // ИСПРАВЛЕНИЕ: Изменяем состояние стора ПОСЛЕ монтирования, чтобы вызвать реактивное обновление
    store.fieldErrors.name = 'Name is required';
    store.fieldErrors.phone = 'Phone is invalid';

    await wrapper.vm.$nextTick(); // Ждем обновления DOM

    expect(wrapper.find('#callback-name-error').text()).toBe('Name is required');
    expect(wrapper.find('#callback-phone-error').text()).toBe('Phone is invalid');
  });

  it('блокирует поля и кнопку во время загрузки', async () => {
    const store = useCallbackStore();

    const wrapper = mount(CallbackForm, {
      global: {
        plugins: [pinia], // ИСПРАВЛЕНИЕ: Передаем созданный экземпляр Pinia компоненту
      },
    });

    // ИСПРАВЛЕНИЕ: Изменяем состояние ПОСЛЕ монтирования
    store.status = FORM_STATUS.LOADING;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('#callback-name').attributes('disabled')).toBeDefined();
    expect(wrapper.find('#callback-phone').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button[type="submit"]').text()).toBe('Отправка...');
  });

  it('не рендерит блок с изображением, если его нет в сторе', () => {
    const store = useCallbackStore();
    store.image = undefined; // Устанавливаем изображение в undefined

    const wrapper = mount(CallbackForm, {global: {plugins: [pinia]}});

    expect(wrapper.find('.callback-form__visual').exists()).toBe(false);
  });
});