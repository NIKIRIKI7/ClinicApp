import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import OurAdvantages from '../../../src/components/sections/OurAdvantages.vue';
import {useAdvantagesStore} from '../../../src/stores/advantages';

const mockAdvantages = {
  title: 'Our Advantages',
  blob: {src: 'blob.png', alt: 'blob'},
  items: [{
    id: 1,
    title: 'Pro Team',
    description: 'Description with <ul>list</ul>'
  }],
};

describe('OurAdvantages.vue', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('вызывает fetchItems при монтировании', () => {
    const store = useAdvantagesStore();
    const fetchSpy = vi.spyOn(store, 'fetchItems');
    mount(OurAdvantages, {global: {plugins: [pinia]}});
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('отображает лоадер во время загрузки', () => {
    const store = useAdvantagesStore();
    store.isLoading = true;
    const wrapper = mount(OurAdvantages, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppLoader'}).exists()).toBe(true);
  });

  it('отображает ошибку', () => {
    const store = useAdvantagesStore();
    store.error = 'Test Error';
    const wrapper = mount(OurAdvantages, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppError'}).exists()).toBe(true);
  });

  it('отображает преимущества после загрузки', async () => {
    const store = useAdvantagesStore();
    const wrapper = mount(OurAdvantages, {global: {plugins: [pinia]}});

    // ИСПРАВЛЕНИЕ: Устанавливаем isLoading в false, чтобы симулировать конец загрузки
    store.isLoading = false;
    store.items = mockAdvantages;
    await wrapper.vm.$nextTick();

    const title = wrapper.find('.advantages__title');
    const itemTitle = wrapper.find('.advantages__item-title');
    const itemDescription = wrapper.find('.advantages__item-description');

    expect(title.text()).toBe('Our Advantages');
    expect(itemTitle.text()).toBe('Pro Team');
    expect(itemDescription.html()).toContain('<ul>list</ul>');
  });
});