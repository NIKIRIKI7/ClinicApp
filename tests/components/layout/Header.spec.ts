import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import {createRouter, createWebHistory} from 'vue-router';
import Header from '../../../src/components/layout/Header.vue';
import {useLayoutStore} from '../../../src/stores/layout';

// ИСПРАВЛЕНО: Добавлены все маршруты, используемые в компоненте, чтобы избежать варнингов
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: {}},
    {path: '/about', component: {}},
    {path: '/doctors', component: {}},
    {path: '/promotions', component: {}},
  ],
});

describe('Header.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('рендерит навигационные ссылки из стора', () => {
    const store = useLayoutStore();
    const wrapper = mount(Header, {
      global: {
        plugins: [createPinia(), router],
      },
    });

    const navLinks = wrapper.findAll('.header__nav-link');
    expect(navLinks.length).toBe(store.header.navItems.length);
    expect(navLinks[0].text()).toBe(store.header.navItems[0].text);
  });

  it('рендерит контакты из стора', () => {
    const store = useLayoutStore();
    const wrapper = mount(Header, {
      global: {
        plugins: [createPinia(), router],
      },
    });

    const phoneLink = wrapper.find('.header__phone');
    expect(phoneLink.attributes('href')).toBe(store.header.contacts.phone.href);
    expect(phoneLink.text()).toBe(store.header.contacts.phone.number);
  });
});