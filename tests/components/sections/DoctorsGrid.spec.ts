import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import DoctorsGrid
  from '../../../src/components/sections/Doctors/DoctorsGrid.vue';
import {useDoctorsStore} from '../../../src/stores/doctors';
import type {IDoctor} from '../../../src/types';

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

  it('отображает сообщение "нет результатов"', () => {
    const store = useDoctorsStore();
    store.doctors = [];
    const wrapper = mount(DoctorsGrid, {global: {plugins: [pinia]}});
    expect(wrapper.find('.doctors-grid__no-results').exists()).toBe(true);
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
});