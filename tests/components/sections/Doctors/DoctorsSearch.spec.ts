import {describe, it, expect, beforeEach, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import DoctorsSearch
  from '../../../../src/components/sections/Doctors/DoctorsSearch.vue';
import {useDoctorsStore} from '../../../../src/stores/doctors';

describe('DoctorsSearch.vue', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('связывает инпуты с фильтрами стора', async () => {
    const store = useDoctorsStore();
    store.allSpecialties = ['Spec1'];
    store.metroStations = ['Metro1'];

    const wrapper = mount(DoctorsSearch, {global: {plugins: [pinia]}});

    const nameInput = wrapper.find('.doctors-search__input');
    await nameInput.setValue('Dr. Name');
    expect(store.filters.name).toBe('Dr. Name');

    const specSelect = wrapper.findAll('select')[0];
    await specSelect.setValue('Spec1');
    expect(store.filters.specialty).toBe('Spec1');

    const metroSelect = wrapper.findAll('select')[1];
    await metroSelect.setValue('Metro1');
    expect(store.filters.metro).toBe('Metro1');
  });

  it('вызывает applyFilters при сабмите формы', async () => {
    const store = useDoctorsStore();
    const applySpy = vi.spyOn(store, 'applyFilters');
    const wrapper = mount(DoctorsSearch, {global: {plugins: [pinia]}});

    await wrapper.find('form').trigger('submit.prevent');

    expect(applySpy).toHaveBeenCalledOnce();
  });

  it('рендерит опции для селектов из стора', async () => {
    const store = useDoctorsStore();
    store.allSpecialties = ['Spec1', 'Spec2'];
    store.metroStations = ['MetroA', 'MetroB'];

    const wrapper = mount(DoctorsSearch, {global: {plugins: [pinia]}});
    await wrapper.vm.$nextTick();

    const specOptions = wrapper.findAll('select')[0].findAll('option');
    // +1 for disabled option
    expect(specOptions.length).toBe(3);
    expect(specOptions[1].text()).toBe('SPEC1');

    const metroOptions = wrapper.findAll('select')[1].findAll('option');
    // +1 for disabled option
    expect(metroOptions.length).toBe(3);
    expect(metroOptions[1].text()).toBe('METROA');
  });
});