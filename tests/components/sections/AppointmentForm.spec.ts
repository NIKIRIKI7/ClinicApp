// Файл: tests/components/sections/AppointmentForm.spec.ts
// ИЗМЕНЕННЫЙ ФАЙЛ
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import AppointmentForm
  from '../../../src/components/sections/AppointmentForm.vue';
import {useAppointmentStore} from '../../../src/stores/appointmentStore';
import {FORM_STATUS} from '../../../src/stores/factories/createFormStore';

describe('AppointmentForm.vue', () => {
  let pinia: Pinia;
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('связывает инпуты с данными стора', async () => {
    const wrapper = mount(AppointmentForm, {global: {plugins: [pinia]}});
    const store = useAppointmentStore();

    const nameInput = wrapper.find('#appointment-name');
    const phoneInput = wrapper.find('#appointment-phone');

    await nameInput.setValue('John');
    await phoneInput.setValue('555-1234');

    expect(store.name).toBe('John');
    expect(store.phone).toBe('555-1234');
  });

  it('вызывает submitForm при сабмите формы', async () => {
    const store = useAppointmentStore();
    const submitSpy = vi.spyOn(store, 'submitForm');
    const wrapper = mount(AppointmentForm, {global: {plugins: [pinia]}});

    await wrapper.find('form').trigger('submit.prevent');
    expect(submitSpy).toHaveBeenCalledOnce();
  });

  // НОВЫЙ ТЕСТ: Покрывает v-if для текста кнопки и состояние disabled
  it('отображает состояние загрузки', async () => {
    const store = useAppointmentStore();
    const wrapper = mount(AppointmentForm, {global: {plugins: [pinia]}});

    store.status = FORM_STATUS.LOADING;
    await wrapper.vm.$nextTick();

    const button = wrapper.find('button[type="submit"]');
    expect(button.text()).toBe('Отправка...');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('не рендерит блок с изображением, если его нет в сторе', () => {
    const store = useAppointmentStore();
    store.image = undefined;

    const wrapper = mount(AppointmentForm, {global: {plugins: [pinia]}});

    expect(wrapper.find('.appointment-form__visual').exists()).toBe(false);
  });
});