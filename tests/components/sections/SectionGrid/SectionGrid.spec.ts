// Файл: C:\Users\mcniki\Documents\stormprojects\clinicapp\tests\components\sections\SectionGrid\SectionGrid.spec.ts
// ИЗМЕНЕННЫЙ ФАЙЛ
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import SectionGrid
  from '../../../../src/components/sections/SectionGrid/SectionGrid.vue';
import {useSectionGridStore} from '../../../../src/stores/sectionGrid';
import {markRaw} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

const mockItems = [{
  id: 1,
  text: 'Test Item',
  to: '/test',
  icon: markRaw({template: '<div>Icon</div>'})
}];

// ИСПРАВЛЕНИЕ: Добавлен корневой маршрут, чтобы избежать предупреждения vue-router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: {template: '<div></div>'}},
    {path: '/test', component: {template: '<div></div>'}}
  ],
});

describe('SectionGrid.vue', () => {
  let pinia: Pinia;

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);
    // ИСПРАВЛЕНИЕ: Убеждаемся, что роутер находится в известном состоянии перед каждым тестом
    router.push('/');
    await router.isReady();
  });

  it('вызывает fetchItems при монтировании', () => {
    const store = useSectionGridStore();
    const fetchSpy = vi.spyOn(store, 'fetchItems');
    mount(SectionGrid, {global: {plugins: [pinia, router]}});
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('отображает лоадер', () => {
    const store = useSectionGridStore();
    store.isLoading = true;
    const wrapper = mount(SectionGrid, {global: {plugins: [pinia, router]}});
    expect(wrapper.findComponent({name: 'AppLoader'}).exists()).toBe(true);
  });

  it('отображает ошибку', () => {
    const store = useSectionGridStore();
    store.error = 'Error';
    const wrapper = mount(SectionGrid, {global: {plugins: [pinia, router]}});
    expect(wrapper.findComponent({name: 'AppError'}).exists()).toBe(true);
  });

  it('отображает элементы сетки', async () => {
    const store = useSectionGridStore();
    const wrapper = mount(SectionGrid, {
      global: {
        plugins: [pinia, router],
      },
    });
    // При монтировании isLoading стал true.
    // Симулируем успешное завершение загрузки:
    store.isLoading = false; // <<< ИСПРАВЛЕНИЕ ЗДЕСЬ
    store.items = mockItems;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({name: 'SectionGridItem'}).exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Item');
  });
});