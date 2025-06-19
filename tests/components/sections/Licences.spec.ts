// Файл: tests/components/sections/Licences.spec.ts
// ИЗМЕНЕННЫЙ ФАЙЛ
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import {ref} from 'vue';
import Licences from '../../../src/components/sections/Licences.vue';
import {useLicensesStore} from '../../../src/stores/licenses';

const mockLicense = {id: 1, src: 'l.png', alt: 'L'};

vi.mock('../../../src/composables/useSlider', () => ({
  useSlider: () => ({
    visibleItems: ref([mockLicense]),
    isPrevDisabled: ref(true),
    isNextDisabled: ref(false),
    goToPrev: vi.fn(),
    goToNext: vi.fn(),
    isModalOpen: ref(false),
    selectedItem: ref(null),
    openModal: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

describe('Licences.vue', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('вызывает fetchItems при монтировании', () => {
    const store = useLicensesStore();
    const fetchSpy = vi.spyOn(store, 'fetchItems');
    mount(Licences, {global: {plugins: [pinia]}});
    expect(fetchSpy).toHaveBeenCalled();
  });

  // НОВЫЙ ТЕСТ: Покрывает ветку v-if="isLoading"
  it('отображает лоадер во время загрузки', () => {
    const store = useLicensesStore();
    store.isLoading = true;
    const wrapper = mount(Licences, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppLoader'}).exists()).toBe(true);
  });

  // НОВЫЙ ТЕСТ: Покрывает ветку v-else-if="error"
  it('отображает ошибку', () => {
    const store = useLicensesStore();
    store.error = 'Test Error';
    const wrapper = mount(Licences, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppError'}).exists()).toBe(true);
  });

  // НОВЫЙ ТЕСТ: Покрывает ветку v-else-if="licenses"
  it('отображает лицензии после загрузки', async () => {
    const store = useLicensesStore();
    store.isLoading = false;
    store.error = null;
    store.items = [mockLicense];
    const wrapper = mount(Licences, {global: {plugins: [pinia]}});
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.licenses__content').exists()).toBe(true);
    expect(wrapper.find('.licenses__image').exists()).toBe(true);
  });
});