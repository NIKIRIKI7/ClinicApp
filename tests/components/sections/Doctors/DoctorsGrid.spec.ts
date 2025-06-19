// Файл: tests/components/sections/Doctors/DoctorsGrid.spec.ts
// ИЗМЕНЕННЫЙ ФАЙЛ
import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import DoctorsGrid
  from '../../../../src/components/sections/Doctors/DoctorsGrid.vue';
import {useDoctorsStore} from '../../../../src/stores/doctors';
import type {IDoctor} from '../../../../src/types';

describe('DoctorsGrid.vue', () => {
  let pinia;
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('отображает лоадер', () => {
    const store = useDoctorsStore();
    store.isLoading = true;
    const wrapper = mount(DoctorsGrid, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppLoader'}).exists()).toBe(true);
  });

  it('отображает ошибку', () => {
    const store = useDoctorsStore();
    store.error = 'Test Error';
    const wrapper = mount(DoctorsGrid, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppError'}).exists()).toBe(true);
  });

  it('отображает сообщение "нет результатов"', () => {
    const store = useDoctorsStore();
    store.doctors = [];
    const wrapper = mount(DoctorsGrid, {global: {plugins: [pinia]}});
    expect(wrapper.find('.doctors-grid__no-results').exists()).toBe(true);
    expect(wrapper.text()).toContain('По вашему запросу врачи не найдены.');
  });

  it('отображает сетку врачей', () => {
    const store = useDoctorsStore();
    store.doctors = [{
      id: 1,
      name: 'Dr. Who',
      specialties: ['Time Lord'],
      photo: 'tardis.png',
      metro: 'Gallifrey'
    }];
    const wrapper = mount(DoctorsGrid, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'DoctorCard'}).exists()).toBe(true);
  });

  // ИСПРАВЛЕННЫЙ ТЕСТ
  it('отображает и скрывает пагинацию', async () => {
    const store = useDoctorsStore();
    // ИСПРАВЛЕНИЕ: Предоставляем валидные данные, а не пустые объекты
    const mockDoctor: IDoctor = {
      id: 0,
      name: 'Doc',
      specialties: ['Spec'],
      photo: '',
      metro: ''
    };
    store.doctors = Array(5).fill(null).map((_, i) => ({...mockDoctor, id: i}));

    store.itemsPerPage = 4;
    store.totalCount = 5; // totalPages will be 2

    const wrapper = mount(DoctorsGrid, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'UIPagination'}).exists()).toBe(true);

    // Скрываем пагинацию
    store.totalCount = 4; // totalPages will be 1
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({name: 'UIPagination'}).exists()).toBe(false);
  });
});