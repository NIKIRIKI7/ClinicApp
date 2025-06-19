import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import DoctorsView
  from '../../../../src/components/sections/Doctors/DoctorsView.vue';
import {useDoctorsStore} from '../../../../src/stores/doctors';
import type {IDoctor} from '../../../../src/types';

describe('DoctorsView.vue', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('вызывает init, если врачей нет в сторе', () => {
    const store = useDoctorsStore();
    const initSpy = vi.spyOn(store, 'init');
    store.doctors = [];

    mount(DoctorsView, {global: {plugins: [pinia]}});

    expect(initSpy).toHaveBeenCalledOnce();
  });

  it('не вызывает init, если врачи уже есть в сторе', () => {
    const store = useDoctorsStore();
    const initSpy = vi.spyOn(store, 'init');
    store.doctors = [{
      id: 1,
      name: 'Doc',
      specialties: [],
      photo: '',
      metro: ''
    }] as IDoctor[];

    mount(DoctorsView, {global: {plugins: [pinia]}});

    expect(initSpy).not.toHaveBeenCalled();
  });

  it('рендерит дочерние компоненты', () => {
    const wrapper = mount(DoctorsView, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'DoctorsSearch'}).exists()).toBe(true);
    expect(wrapper.findComponent({name: 'DoctorsGrid'}).exists()).toBe(true);
  });
});