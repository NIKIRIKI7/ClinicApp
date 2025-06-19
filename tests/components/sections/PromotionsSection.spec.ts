import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import PromotionsSection
  from '../../../src/components/sections/PromotionsSection.vue';
import {usePromotionsStore} from '../../../src/stores/promotions';

const mockPromotions = [{
  id: 1,
  image: 'img.png',
  alt: 'alt',
  date: 'date',
  title: 'title',
  description: 'desc'
}];

describe('PromotionsSection.vue', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('вызывает fetchItems при монтировании', () => {
    const store = usePromotionsStore();
    const fetchSpy = vi.spyOn(store, 'fetchItems');
    mount(PromotionsSection, {global: {plugins: [pinia]}});
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('отображает лоадер во время загрузки', () => {
    const store = usePromotionsStore();
    store.isLoading = true;
    const wrapper = mount(PromotionsSection, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppLoader'}).exists()).toBe(true);
  });

  it('отображает ошибку', () => {
    const store = usePromotionsStore();
    store.error = 'Test Error';
    const wrapper = mount(PromotionsSection, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppError'}).exists()).toBe(true);
  });

  it('отображает акции после загрузки', async () => {
    const store = usePromotionsStore();
    const wrapper = mount(PromotionsSection, {global: {plugins: [pinia]}});

    // ИСПРАВЛЕНИЕ: Устанавливаем isLoading в false, чтобы симулировать конец загрузки
    store.isLoading = false;
    store.items = mockPromotions;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.promotion-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('title');
  });
});