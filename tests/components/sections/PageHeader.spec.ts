import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import PageHeader from '../../../src/components/sections/PageHeader.vue';

// 1. Объявляем кастомный тип для метаданных маршрута
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    breadcrumbs?: Array<{ text: string; to?: string }>;
  }
}

// 2. Создаем маршруты с явным типизированием
const routes: RouteRecordRaw[] = [{
  path: '/',
  component: {}
}];

describe('PageHeader.vue', () => {
  // 3. Создаем роутер внутри тестов для изоляции
  let router: ReturnType<typeof createRouter>;

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes
    });
    await router.push('/');
    await router.isReady();
  });

  it('отображает title и breadcrumbs из props', async () => {
    const wrapper = mount(PageHeader, {
      props: {
        title: 'Prop Title',
        breadcrumbs: [{text: 'Home', to: '/'}, {text: 'Prop Page'}],
      },
      global: {plugins: [router]},
    });

    expect(wrapper.find('.page-header__title').text()).toBe('Prop Title');
    expect(wrapper.findAll('.page-header__breadcrumbs-item')).toHaveLength(2);
    expect(wrapper.text()).toContain('Prop Page');
  });

  it('отображает title и breadcrumbs из route.meta, если props не переданы', async () => {
    // 4. Добавляем новый маршрут с meta через addRoute
    router.addRoute({
      path: '/test',
      component: {},
      meta: {
        title: 'Meta Title',
        breadcrumbs: [{text: 'Home', to: '/'}, {text: 'Meta Page'}],
      },
    });
    await router.push('/test');
    await router.isReady();

    const wrapper = mount(PageHeader, {
      global: {plugins: [router]},
    });

    expect(wrapper.find('.page-header__title').text()).toBe('Meta Title');
    expect(wrapper.text()).toContain('Meta Page');
  });

  it('не рендерит ничего, если нет ни props, ни meta', async () => {
    router.addRoute({
      path: '/empty',
      component: {},
      meta: {} // Явно пустые meta
    });
    await router.push('/empty');
    await router.isReady();

    const wrapper = mount(PageHeader, {
      global: {plugins: [router]},
    });

    expect(wrapper.find('.page-header__title').exists()).toBe(false);
    expect(wrapper.find('.page-header__breadcrumbs').exists()).toBe(false);
  });
});